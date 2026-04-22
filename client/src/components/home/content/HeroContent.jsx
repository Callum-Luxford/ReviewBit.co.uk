import { useEffect, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import * as THREE from "three";
import CTAButton from "../../buttons/CtaButton";
import { useAuthBoot } from "../../../context/AuthBootContext";

/**
 * HeroVisual
 * --------------------------------------------------
 * 3D globe with dotted continents and animated arc connections.
 *
 * Palette source:
 *  - Pulls --accent-primary, --accent-secondary, --accent-tertiary from
 *    the document root at mount, so the globe always matches your CSS
 *    variables. Falls back to sensible defaults if a variable is missing.
 *  - Continents are off-white (the substrate). A small percentage of
 *    dots get an accent colour, sprinkled — the globe carries a hint of
 *    your brand without becoming "an orange ball" or "a purple ball."
 *
 * Behaviour:
 *  - Continuous slow auto-rotation (never fully pauses)
 *  - Mouse moves the camera perspective orbitally (very gentle)
 *  - Frequent arcs traveling between point-of-presence nodes
 *  - Pulse rings bloom at arc endpoints
 *  - Respects prefers-reduced-motion
 *
 * Props:
 *  - size (number | string): target width via --hero-visual-size. Default 720.
 *  - maxSize (number | string): hard ceiling via --hero-visual-max. Default 900.
 */
function HeroVisual({ size = 720, maxSize = 900 }) {
  const mountRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---- Resolve palette from CSS variables ----
    // This means the globe always tracks whatever you set in your root CSS.
    // Edit the accent vars in your root file → globe updates next reload.
    const rootStyles = getComputedStyle(document.documentElement);
    const cssVar = (name, fallback) => {
      const v = rootStyles.getPropertyValue(name).trim();
      return v || fallback;
    };

    const ACCENT_PRIMARY = cssVar("--accent-primary");
    const ACCENT_SECONDARY = cssVar("--accent-secondary");
    const ACCENT_TERTIARY = cssVar("--accent-tertiary", "#a8a8b0");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const CONFIG = {
      globeRadius: 2.0,
      coreRadius: 1.98,
      continentRadius: 2.012,
      poiRadius: 2.045,

      // ---- Dot sampling tuning ----
      dotGridStep: 7,
      dotSize: 0.028,
      polarBias: 1.15,
      jitterDegrees: 0.22,

      // ---- Brightness ----
      // Lower than before because dots are now off-white, not orange.
      // White doesn't need additive boosting against dark the same way.
      dotBrightness: 1.0,

      // ---- Accent dot mix ----
      // Of all sampled land dots, this fraction get an accent colour
      // instead of the off-white substrate colour. Keep this small —
      // 6–10% reads as "sprinkled hints", >15% reads as "polka dots".
      accentDotChance: 0.08,
      // Within the accent dots, split between primary / secondary.
      // Tertiary is intentionally absent from the globe to keep it visually
      // tied to the two "active" brand colours.
      accentPrimaryRatio: 0.55,

      arcMaxConcurrent: 16,
      arcSpawnInterval: 320,
      arcDuration: 2600,
      arcThickness: 0.0044,
      arcHeightBoost: 0.52,

      rotationSpeed: 0.00145,
      rotationSpeedHover: 0.00055,

      cameraDistance: 8.1,
      maxAzimuth: 0.14,
      maxElevation: 0.1,
      cameraLerp: 0.055,
    };

    // ---- Colour palette ----
    // Globe surface colours are intentionally muted. Accent colours come
    // from the resolved CSS variables above.
    const COLOR_DOT_BASE = new THREE.Color(0xd8d4cc); // off-white substrate
    const COLOR_DOT_BASE_BRIGHT = new THREE.Color(0xeae6dc); // brighter substrate
    const COLOR_DOT_ACCENT_A = new THREE.Color(ACCENT_PRIMARY);
    const COLOR_DOT_ACCENT_B = new THREE.Color(ACCENT_SECONDARY);

    const COLOR_POI = 0xffffff; // white core
    const COLOR_POI_GLOW = new THREE.Color(ACCENT_PRIMARY); // warm halo
    const COLOR_RING = 0xfff6ec;
    const COLOR_ARC = new THREE.Color(ACCENT_PRIMARY); // arcs in primary

    // Globe core stays warm-charcoal so the surface feels lived-in.
    const COLOR_GLOBE_CORE = 0x121013;
    // Atmosphere & rim use primary at low intensity — barely there.
    const COLOR_ATMOSPHERE = new THREE.Color(ACCENT_PRIMARY);
    const COLOR_RIM = new THREE.Color(ACCENT_PRIMARY);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      52,
      mount.clientWidth / mount.clientHeight || 1,
      0.1,
      100,
    );
    camera.position.set(0, 0, CONFIG.cameraDistance);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroup.scale.setScalar(1.12);

    // ===== CORE =====
    const coreGeom = new THREE.SphereGeometry(CONFIG.coreRadius, 72, 72);
    const coreMat = new THREE.MeshBasicMaterial({
      color: COLOR_GLOBE_CORE,
      transparent: false,
      depthWrite: true,
      depthTest: true,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    globeGroup.add(core);

    // ===== INNER SHADE =====
    const innerGlowGeom = new THREE.SphereGeometry(CONFIG.globeRadius, 72, 72);
    const innerGlowMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x1f1a1c) },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        varying vec3 vNormalDir;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vNormalDir = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPos;
        varying vec3 vNormalDir;
        uniform vec3 uColor;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          float fresnel = pow(1.0 - max(dot(vNormalDir, viewDir), 0.0), 2.5);
          float alpha = fresnel * 0.18;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeom, innerGlowMat);
    globeGroup.add(innerGlow);

    // ===== ATMOSPHERE — much dimmer than before =====
    const atmosphereGeom = new THREE.SphereGeometry(
      CONFIG.globeRadius * 1.08,
      72,
      72,
    );
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: COLOR_ATMOSPHERE },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(0.82 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          // Dropped from 0.58 → 0.32 so the atmosphere whispers rather than glows
          gl_FragColor = vec4(uColor, 1.0) * intensity * 0.32;
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    scene.add(atmosphere);

    // ===== RIM — softened =====
    const rimGeom = new THREE.SphereGeometry(
      CONFIG.globeRadius * 1.002,
      72,
      72,
    );
    const rimMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: COLOR_RIM },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        varying vec3 vNormalDir;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vNormalDir = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPos;
        varying vec3 vNormalDir;
        uniform vec3 uColor;
        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          float fresnel = pow(1.0 - max(dot(vNormalDir, viewDir), 0.0), 3.6);
          // Dropped from 0.82 → 0.55 — a present rim, not a halo
          float alpha = fresnel * 0.55;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const rim = new THREE.Mesh(rimGeom, rimMat);
    globeGroup.add(rim);

    let continentData = null;
    let poiData = null;
    const arcs = [];

    function latLonToVector3(lat, lon, radius) {
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;

      const x = Math.cos(latRad) * Math.cos(lonRad) * radius;
      const y = Math.sin(latRad) * radius;
      const z = Math.cos(latRad) * Math.sin(lonRad) * radius;

      return new THREE.Vector3(x, y, z);
    }

    function buildContinentsFromTexture(image) {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      const { data, width, height } = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      const positions = [];
      const alphas = [];
      const sizes = [];
      // aType encodes which colour palette this dot uses:
      //   0 = base off-white   1 = accent primary   2 = accent secondary
      const types = [];

      for (let y = 0; y < height; y += CONFIG.dotGridStep) {
        const v = y / height;
        const lat = 90 - v * 180;

        const latRad = (lat * Math.PI) / 180;
        const keepChance = Math.pow(
          Math.max(Math.cos(latRad), 0),
          CONFIG.polarBias,
        );

        for (let x = 0; x < width; x += CONFIG.dotGridStep) {
          if (Math.random() > keepChance) continue;

          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const brightness = (r + g + b) / 3;

          if (brightness < 140) continue;

          const u = x / width;
          let lon = u * 360 - 180;
          let jLat = lat;

          const j = CONFIG.jitterDegrees;
          lon += (Math.random() - 0.5) * 2 * j;
          jLat += (Math.random() - 0.5) * 2 * j;

          const p = latLonToVector3(jLat, lon, CONFIG.continentRadius);

          positions.push(p.x, p.y, p.z);
          alphas.push(0.7 + Math.random() * 0.22);

          // Decide colour role for this dot
          if (Math.random() < CONFIG.accentDotChance) {
            const isPrimary = Math.random() < CONFIG.accentPrimaryRatio;
            types.push(isPrimary ? 1 : 2);
            // Accent dots are slightly larger so they read as highlights
            sizes.push(1.05 + Math.random() * 0.18);
          } else {
            types.push(0);
            // Substrate dots vary subtly in size for natural texture
            sizes.push(0.85 + Math.random() * 0.2);
          }
        }
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geom.setAttribute("aAlpha", new THREE.Float32BufferAttribute(alphas, 1));
      geom.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
      geom.setAttribute("aType", new THREE.Float32BufferAttribute(types, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColorBase: { value: COLOR_DOT_BASE },
          uColorBaseBright: { value: COLOR_DOT_BASE_BRIGHT },
          uColorAccentA: { value: COLOR_DOT_ACCENT_A },
          uColorAccentB: { value: COLOR_DOT_ACCENT_B },
          uSize: { value: CONFIG.dotSize },
          uBrightness: { value: CONFIG.dotBrightness },
        },
        vertexShader: `
          attribute float aAlpha;
          attribute float aSize;
          attribute float aType;
          varying float vAlpha;
          varying float vMix;
          varying float vType;
          uniform float uSize;

          void main() {
            vAlpha = aAlpha;
            vMix = aSize;
            vType = aType;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (uSize * aSize) * (300.0 / -mvPosition.z);
          }
        `,
        fragmentShader: `
          uniform vec3 uColorBase;
          uniform vec3 uColorBaseBright;
          uniform vec3 uColorAccentA;
          uniform vec3 uColorAccentB;
          uniform float uBrightness;
          varying float vAlpha;
          varying float vMix;
          varying float vType;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;

            float soft = smoothstep(0.5, 0.10, d);

            // Pick the colour based on dot type
            // 0 = base, 1 = accent A, 2 = accent B
            vec3 color;
            if (vType < 0.5) {
              // Base substrate — interpolate base/bright by relative size
              color = mix(uColorBase, uColorBaseBright, clamp(vMix - 0.9, 0.0, 1.0));
            } else if (vType < 1.5) {
              color = uColorAccentA;
            } else {
              color = uColorAccentB;
            }

            color *= uBrightness;

            gl_FragColor = vec4(color, soft * vAlpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geom, mat);
      globeGroup.add(points);

      return { geom, mat, points };
    }

    // Major city style hubs instead of random POIs
    function buildMajorCityPois() {
      const majorCities = [
        { name: "New York", lat: 40.7128, lon: -74.006 },
        { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
        { name: "Chicago", lat: 41.8781, lon: -87.6298 },
        { name: "Toronto", lat: 43.6532, lon: -79.3832 },
        { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
        { name: "Bogota", lat: 4.711, lon: -74.0721 },
        { name: "Sao Paulo", lat: -23.5558, lon: -46.6396 },
        { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
        { name: "Santiago", lat: -33.4489, lon: -70.6693 },

        { name: "London", lat: 51.5072, lon: -0.1276 },
        { name: "Paris", lat: 48.8566, lon: 2.3522 },
        { name: "Amsterdam", lat: 52.3676, lon: 4.9041 },
        { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
        { name: "Madrid", lat: 40.4168, lon: -3.7038 },
        { name: "Rome", lat: 41.9028, lon: 12.4964 },
        { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
        { name: "Stockholm", lat: 59.3293, lon: 18.0686 },

        { name: "Dubai", lat: 25.2048, lon: 55.2708 },
        { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
        { name: "Lagos", lat: 6.5244, lon: 3.3792 },
        { name: "Nairobi", lat: -1.2864, lon: 36.8172 },
        { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
        { name: "Cape Town", lat: -33.9249, lon: 18.4241 },

        { name: "Mumbai", lat: 19.076, lon: 72.8777 },
        { name: "Delhi", lat: 28.6139, lon: 77.209 },
        { name: "Singapore", lat: 1.3521, lon: 103.8198 },
        { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
        { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
        { name: "Shanghai", lat: 31.2304, lon: 121.4737 },
        { name: "Seoul", lat: 37.5665, lon: 126.978 },
        { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
        { name: "Sydney", lat: -33.8688, lon: 151.2093 },
        { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
      ];

      const positions = [];
      const coords = [];

      for (const city of majorCities) {
        const p = latLonToVector3(city.lat, city.lon, CONFIG.poiRadius);
        positions.push(p.x, p.y, p.z);
        coords.push({
          ...city,
          x: p.x,
          y: p.y,
          z: p.z,
        });
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );

      // Warm halo — primary accent at low opacity
      const haloMat = new THREE.PointsMaterial({
        color: COLOR_POI_GLOW,
        size: 0.13,
        transparent: true,
        opacity: 0.28,
        sizeAttenuation: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });
      const halos = new THREE.Points(geom, haloMat);
      globeGroup.add(halos);

      // Pure white core — these are the "active nodes"
      const pointMat = new THREE.PointsMaterial({
        color: COLOR_POI,
        size: 0.055,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
        depthWrite: false,
        depthTest: true,
      });
      const points = new THREE.Points(geom, pointMat);
      globeGroup.add(points);

      return {
        geom,
        haloMat,
        pointMat,
        halos,
        points,
        coords,
      };
    }

    function pickWeightedConnection(coords) {
      const hubNames = new Set([
        "New York",
        "London",
        "Paris",
        "Dubai",
        "Singapore",
        "Hong Kong",
        "Tokyo",
        "Sao Paulo",
        "Johannesburg",
      ]);

      const weighted = [];
      coords.forEach((c) => {
        const weight = hubNames.has(c.name) ? 3 : 1;
        for (let i = 0; i < weight; i++) weighted.push(c);
      });

      const a = weighted[Math.floor(Math.random() * weighted.length)];
      let b = weighted[Math.floor(Math.random() * weighted.length)];

      while (b.name === a.name) {
        b = weighted[Math.floor(Math.random() * weighted.length)];
      }

      return [a, b];
    }

    function createArc(startCoord, endCoord) {
      const start = new THREE.Vector3(startCoord.x, startCoord.y, startCoord.z);
      const end = new THREE.Vector3(endCoord.x, endCoord.y, endCoord.z);

      const distance = start.distanceTo(end);
      const midPoint = start.clone().add(end).multiplyScalar(0.5);

      const arcHeight = CONFIG.globeRadius + distance * CONFIG.arcHeightBoost;
      midPoint.normalize().multiplyScalar(arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);

      const tubeGeom = new THREE.TubeGeometry(
        curve,
        72,
        CONFIG.arcThickness,
        6,
        false,
      );

      const arcMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: COLOR_ARC },
        },
        vertexShader: `
          varying float vProgress;
          void main() {
            vProgress = uv.x;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          varying float vProgress;

          void main() {
            float head = uTime;
            float dist = abs(vProgress - head);

            float headGlow = smoothstep(0.06, 0.0, dist);
            float trail = 0.0;

            if (vProgress < head) {
              trail = smoothstep(0.20, 0.0, head - vProgress) * 0.20;
            }

            float alpha = headGlow + trail;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });

      const tube = new THREE.Mesh(tubeGeom, arcMat);
      tube.frustumCulled = false;
      globeGroup.add(tube);

      const ringGeom = new THREE.RingGeometry(0.014, 0.022, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: COLOR_RING,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(end);
      ring.lookAt(0, 0, 0);
      ring.frustumCulled = false;
      globeGroup.add(ring);

      return {
        tube,
        tubeGeom,
        arcMat,
        ring,
        ringGeom,
        ringMat,
        startTime: performance.now(),
      };
    }

    function disposeArc(arc) {
      globeGroup.remove(arc.tube);
      globeGroup.remove(arc.ring);
      arc.tubeGeom.dispose();
      arc.arcMat.dispose();
      arc.ringGeom.dispose();
      arc.ringMat.dispose();
    }

    function spawnArc() {
      if (!poiData || poiData.coords.length < 2) return;
      if (arcs.length >= CONFIG.arcMaxConcurrent) return;

      const [a, b] = pickWeightedConnection(poiData.coords);
      arcs.push(createArc(a, b));
    }

    function initFromTexture(image) {
      continentData = buildContinentsFromTexture(image);
      poiData = buildMajorCityPois();

      for (let i = 0; i < 8; i++) {
        spawnArc();
      }
    }

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      "/world-map.png",
      (texture) => {
        const image = texture.image;
        initFromTexture(image);
        texture.dispose();
      },
      undefined,
      () => {
        console.warn("world-map.png failed to load");
      },
    );

    const arcInterval = setInterval(spawnArc, CONFIG.arcSpawnInterval);

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    let camAzimuth = 0;
    let camElevation = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
    };

    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mouseenter", handleMouseEnter);
    mount.addEventListener("mouseleave", handleMouseLeave);

    const clock = new THREE.Clock();
    let frameId;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) clock.start();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const now = performance.now();

      if (!prefersReducedMotion) {
        const rotSpeed = isHovering
          ? CONFIG.rotationSpeedHover
          : CONFIG.rotationSpeed;
        globeGroup.rotation.y += rotSpeed;
        globeGroup.rotation.x = -0.14 + Math.sin(t * 0.14) * 0.012;

        if (poiData?.halos) {
          poiData.haloMat.opacity = 0.22 + Math.sin(t * 2.2) * 0.04;
        }

        for (let i = arcs.length - 1; i >= 0; i--) {
          const arc = arcs[i];
          const elapsed = now - arc.startTime;
          const progress = elapsed / CONFIG.arcDuration;

          if (progress >= 1.28) {
            disposeArc(arc);
            arcs.splice(i, 1);
            continue;
          }

          arc.arcMat.uniforms.uTime.value = Math.min(progress, 1);

          if (progress > 0.82 && progress < 1.28) {
            const pulseT = (progress - 0.82) / 0.46;
            arc.ring.scale.setScalar(1 + pulseT * 2.6);
            arc.ringMat.opacity = (1 - pulseT) * 0.85;
          }
        }
      }

      const targetAz = mouseX * CONFIG.maxAzimuth;
      const targetEl = -mouseY * CONFIG.maxElevation;

      camAzimuth += (targetAz - camAzimuth) * CONFIG.cameraLerp;
      camElevation += (targetEl - camElevation) * CONFIG.cameraLerp;

      const r = CONFIG.cameraDistance;
      camera.position.x = r * Math.sin(camAzimuth) * Math.cos(camElevation);
      camera.position.y = r * Math.sin(camElevation);
      camera.position.z = r * Math.cos(camAzimuth) * Math.cos(camElevation);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(handleResize)
        : null;
    if (resizeObserver) resizeObserver.observe(mount);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(arcInterval);

      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();

      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mouseenter", handleMouseEnter);
      mount.removeEventListener("mouseleave", handleMouseLeave);

      arcs.forEach(disposeArc);

      if (continentData) {
        continentData.geom.dispose();
        continentData.mat.dispose();
      }

      if (poiData) {
        poiData.geom.dispose();
        poiData.haloMat.dispose();
        poiData.pointMat.dispose();
      }

      coreGeom.dispose();
      coreMat.dispose();
      innerGlowGeom.dispose();
      innerGlowMat.dispose();
      atmosphereGeom.dispose();
      atmosphereMat.dispose();
      rimGeom.dispose();
      rimMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const sizeValue = typeof size === "number" ? `${size}px` : size;
  const maxValue = typeof maxSize === "number" ? `${maxSize}px` : maxSize;

  return (
    <div
      ref={wrapRef}
      className="hero-visual-wrap"
      style={{
        "--hero-visual-size": sizeValue,
        "--hero-visual-max": maxValue,
      }}
    >
      <div ref={mountRef} className="hero-visual-canvas" aria-hidden="true" />
    </div>
  );
}

/**
 * HeroContent
 */
function HeroContent() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const { startAuthBoot } = useAuthBoot();

  return (
    <section className="rb-hero">
      {/* Accent colour washes */}
      <div className="rb-hero__bg" />

      {/* 1400px constrained container */}
      <div className="rb-hero__inner">
        <div className="rb-hero__grid-layout section-grid section-grid--8x6">
          {/* ── ROW 1 — top pad, pushes panels down from header ─ */}
          <div className="rb-hero__cell rb-hero__cell--nav-left" />
          <div className="rb-hero__cell rb-hero__cell--nav-right" />

          {/* ── ROW 2 LEFT — text content ───────────────────── */}
          <div className="rb-hero__left">
            <div className="rb-hero__system-label">
              <span className="rb-hero__system-label-dot" />
              <span>System Status&nbsp;·&nbsp;Active</span>
            </div>

            <h1 className="rb-hero__title">
              <span className="rb-hero__title-line">Boost Your</span>
              <span className="rb-hero__title-line">Reviews</span>
              <span className="rb-hero__accent">
                <ReactTyped
                  strings={["Less Effort", "Less Hassle", "On Autopilot"]}
                  typeSpeed={50}
                  backSpeed={35}
                  backDelay={2000}
                  loop
                />
              </span>
            </h1>

            <p className="rb-hero__copy">
              Let customers scan, leave a review, and grow your reputation in
              seconds. Capture, route, and resolve at the speed of compute.
            </p>

            <div className="rb-hero__actions">
              <CTAButton
                onClick={() => startAuthBoot("signup")}
                mode="paired-switch"
                pairState={hoveredButton === "demo" ? "inactive" : "active"}
                onMouseEnter={() => setHoveredButton("trial")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Initialize Engine
              </CTAButton>
              <CTAButton
                onClick={() => startAuthBoot("login")}
                mode="paired-switch"
                pairState={hoveredButton === "demo" ? "active" : "inactive"}
                onMouseEnter={() => setHoveredButton("demo")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Open Workspace
              </CTAButton>
            </div>
          </div>

          {/* ── ROW 2 RIGHT — globe frame panel ─────────────── */}
          <div className="rb-hero__frame">
            <span className="rb-hero__frame-tick rb-hero__frame-tick--tl" />
            <span className="rb-hero__frame-tick rb-hero__frame-tick--tr" />
            <span className="rb-hero__frame-tick rb-hero__frame-tick--bl" />
            <span className="rb-hero__frame-tick rb-hero__frame-tick--br" />

            <div className="rb-hero__frame-topbar">
              <span className="rb-hero__frame-readout">
                COORD: 51.90 // FRE 14
              </span>
              <span className="rb-hero__frame-readout rb-hero__frame-readout--ok">
                SYS_OK
              </span>
            </div>

            <div className="rb-hero__frame-vticks" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="rb-hero__frame-vtick" />
              ))}
            </div>

            <div className="rb-hero__frame-stage">
              <div className="rb-hero__frame-inset" />

              {/* INNER PANEL */}
              <div className="rb-hero__core-panel">
                {/* top-right callout */}
                <div
                  className="rb-hero__core-callout rb-hero__core-callout--tr"
                  aria-hidden="true"
                >
                  <span className="rb-hero__core-callout-line rb-hero__core-callout-line--tr-h" />
                  <span className="rb-hero__core-callout-line rb-hero__core-callout-line--tr-v" />
                  <div className="rb-hero__core-callout-box rb-hero__core-callout-box--sm">
                    <span className="rb-hero__core-callout-notch rb-hero__core-callout-notch--top" />
                    <span className="rb-hero__core-callout-notch rb-hero__core-callout-notch--bottom" />
                  </div>
                </div>

                {/* mid-left callout */}
                <div
                  className="rb-hero__core-callout rb-hero__core-callout--ml"
                  aria-hidden="true"
                >
                  <span className="rb-hero__core-callout-line rb-hero__core-callout-line--ml-h" />
                  <span className="rb-hero__core-callout-line rb-hero__core-callout-line--ml-v" />
                  <div className="rb-hero__core-callout-box rb-hero__core-callout-box--rail">
                    <span className="rb-hero__core-callout-notch rb-hero__core-callout-notch--top" />
                    <span className="rb-hero__core-callout-notch rb-hero__core-callout-notch--bottom" />
                  </div>
                </div>

                {/* bottom-left callout */}
                <div
                  className="rb-hero__core-callout rb-hero__core-callout--bl"
                  aria-hidden="true"
                >
                  <span className="rb-hero__core-callout-line rb-hero__core-callout-line--bl-v" />
                  <span className="rb-hero__core-callout-line rb-hero__core-callout-line--bl-h" />
                  <div className="rb-hero__core-callout-box rb-hero__core-callout-box--sm">
                    <span className="rb-hero__core-callout-notch rb-hero__core-callout-notch--top" />
                    <span className="rb-hero__core-callout-notch rb-hero__core-callout-notch--bottom" />
                  </div>
                </div>

                <div className="rb-hero__core-stage">
                  <div className="rb-hero__core-zone rb-hero__core-zone--top">
                    <div className="rb-hero__core-zone-topbar">
                      <span className="rb-hero__frame-readout">
                        COORD. FL.03 // PR 68
                      </span>
                    </div>
                  </div>

                  <div className="rb-hero__core-zone rb-hero__core-zone--middle">
                    <div className="rb-hero__core-grid" aria-hidden="true" />
                    <div className="rb-hero__core-plane" aria-hidden="true" />

                    <div className="rb-hero__core-orbit">
                      <HeroVisual size={420} maxSize={500} />
                    </div>
                  </div>

                  <div className="rb-hero__core-zone rb-hero__core-zone--bottom">
                    <div className="rb-hero__core-zone-bottombar">
                      <span className="rb-hero__frame-readout rb-hero__frame-readout--dim rb-hero__core-zone-bottom-readout">
                        RENDERCORE FLD...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rb-hero__core-panel-bottombar">
                  <span className="rb-hero__frame-readout rb-hero__frame-readout--dim rb-hero__frame-readout--blink">
                    RENDERING FLOW...
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 3 — bottom pad, space below panels ───────── */}
          <div className="rb-hero__cell rb-hero__cell--bot-left" />
          <div className="rb-hero__cell rb-hero__cell--bot-right" />
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
