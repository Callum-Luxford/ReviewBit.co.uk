// import { ReactTyped } from "react-typed";
// import CTAButton from "../../buttons/CtaButton";
// import SolarOrbits from "../../../components/ui/SolarOrbits";
// import ReviewOrbitCore from "./ReviewOrbitCore";

// function HeroContent() {
//   return (
//     <section className="rb-hero border-b border-white/10">
//       <div className="rb-hero__bg" />
//       <div className="rb-hero__grid" />
//       {/* <div className="rb-hero__scanline" /> */}

//       <div className="rb-hero__decor rb-hero__decor--left" aria-hidden="true" />
//       <div
//         className="rb-hero__decor rb-hero__decor--right"
//         aria-hidden="true"
//       />

//       <div className="rb-hero__inner">
//         <div className="rb-hero__content">
//           <div className="rb-hero__left">
//             <div className="rb-hero__badge">
//               <span className="rb-hero__badge-dot" />
//               New: Automated Review Routing
//             </div>

//             <h1 className="rb-hero__title">
//               <span className="rb-hero__title-line">
//                 Turn customer sentiment into
//               </span>
//               <span className="rb-hero__accent">
//                 <ReactTyped
//                   strings={["Smarter Flow", "Better Reviews", "Faster Growth"]}
//                   typeSpeed={48}
//                   backSpeed={28}
//                   backDelay={2600}
//                   loop
//                 />
//               </span>
//             </h1>

//             <p className="rb-hero__copy">
//               ReviewBit helps you route happy customers toward public reviews,
//               capture private feedback before it spreads, and automate the
//               follow-up flow that keeps your reputation moving forward.
//             </p>

//             <div className="rb-hero__actions">
//               <CTAButton to="/signup" accent="green" mode="solid-hover-outline">
//                 Start Free Trial
//               </CTAButton>

//               <CTAButton to="/login" accent="purple" mode="hover-fill">
//                 ▶ See Demo
//               </CTAButton>
//             </div>

//             <p className="rb-hero__note">
//               14-day free trial. No credit card required.
//             </p>

//             <div className="rb-hero__trust-row">
//               <div className="rb-hero__trust-pill">
//                 <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--primary" />
//                 Public review routing
//               </div>

//               <div className="rb-hero__trust-pill">
//                 <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--secondary" />
//                 Private feedback capture
//               </div>

//               <div className="rb-hero__trust-pill">
//                 <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--tertiary" />
//                 Automated follow-up ready
//               </div>
//             </div>
//           </div>

//           <div className="rb-hero__right" aria-hidden="true">
//             <div className="rb-hero-visual rb-hero-visual--orbit-core">
//               <ReviewOrbitCore className="rb-hero-orbit-core" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HeroContent;

import { useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import * as THREE from "three";
import CTAButton from "../../buttons/CtaButton";

/**
 * HeroVisual
 * --------------------------------------------------
 * 3D globe with dotted continents and animated arc connections.
 *
 * Continent rendering:
 *  - Samples /world-map.png (equirectangular, white land on black)
 *  - Latitude-aware density so polar regions don't over-sample
 *  - Small positional jitter to avoid moiré banding on the sphere
 *
 * Behaviour:
 *  - Continuous slow auto-rotation (never fully pauses)
 *  - Mouse moves the camera perspective orbitally (very gentle)
 *  - Dots on the back of the globe remain partially visible (depth)
 *  - Frequent thick arcs traveling between point-of-presence nodes
 *  - Pulse rings bloom at arc endpoints
 *  - Respects prefers-reduced-motion
 *
 * Props:
 *  - size (number | string): target width for the globe wrap via
 *    --hero-visual-size. Numbers are treated as pixels. Strings are
 *    passed through (e.g. "min(100%, 760px)"). Default: 720.
 *  - maxSize (number | string): hard ceiling via --hero-visual-max.
 *    Used so the wrap can break out of its column on desktop but still
 *    clamp on smaller screens via the CSS breakpoints. Default: 900.
 */
function HeroVisual({ size = 720, maxSize = 900 }) {
  const mountRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const CONFIG = {
      globeRadius: 2.0,
      coreRadius: 1.98,
      continentRadius: 2.012,
      poiRadius: 2.045,

      // ---- Dot sampling tuning ----
      // Base grid step (higher = fewer dots). Was 5; 7 removes ~half.
      dotGridStep: 7,
      dotSize: 0.022,
      // Skip factor curve by latitude — scales 0..1. Sampling chance is
      // multiplied by cos(lat)^polarBias so polar rings don't over-sample.
      polarBias: 1.15,
      // Random jitter in degrees applied to each dot's lat/lon so the
      // regular grid doesn't show as a weave on the sphere.
      jitterDegrees: 0.22,

      arcMaxConcurrent: 18,
      arcSpawnInterval: 300,
      arcDuration: 2600,
      arcThickness: 0.0048,
      arcHeightBoost: 0.52,

      rotationSpeed: 0.00145,
      rotationSpeedHover: 0.00055, // slowed, not stopped, on hover

      // Mouse orbital camera (very subtle)
      cameraDistance: 8.1,
      maxAzimuth: 0.14, // radians (~8°)
      maxElevation: 0.1, // radians (~5.7°)
      cameraLerp: 0.055,
    };

    // cleaner amber/orange palette
    const COLOR_DOT = new THREE.Color(0xff9a2f);
    const COLOR_DOT_BRIGHT = new THREE.Color(0xffc15e);
    const COLOR_POI = 0xfff5ea;
    const COLOR_POI_GLOW = new THREE.Color(0xffa94d);
    const COLOR_RING = 0xfff6ec;
    const COLOR_ARC = new THREE.Color(0xffaf52);
    const COLOR_GLOBE_CORE = 0x130907;
    const COLOR_ATMOSPHERE = new THREE.Color(0xff7a1f);
    const COLOR_RIM = new THREE.Color(0xff8e2c);

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
        uColor: { value: new THREE.Color(0x2a120d) },
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
          float alpha = fresnel * 0.22;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeom, innerGlowMat);
    globeGroup.add(innerGlow);

    // ===== ATMOSPHERE =====
    const atmosphereGeom = new THREE.SphereGeometry(
      CONFIG.globeRadius * 1.09,
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
          float intensity = pow(0.82 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(uColor, 1.0) * intensity * 0.58;
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    scene.add(atmosphere);

    // ===== RIM =====
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
          float alpha = fresnel * 0.82;
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

      for (let y = 0; y < height; y += CONFIG.dotGridStep) {
        // Latitude in degrees for the current row (equator = 0)
        const v = y / height;
        const lat = 90 - v * 180;

        // cos(lat) goes 1 at equator -> 0 at poles. Raising to polarBias
        // tightens the curve so high latitudes are thinned out.
        const latRad = (lat * Math.PI) / 180;
        const keepChance = Math.pow(
          Math.max(Math.cos(latRad), 0),
          CONFIG.polarBias,
        );

        for (let x = 0; x < width; x += CONFIG.dotGridStep) {
          // Probabilistic skip by latitude — the main moiré killer
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

          // Small positional jitter so the sampling grid doesn't read as
          // a weave when wrapped onto the sphere.
          const j = CONFIG.jitterDegrees;
          lon += (Math.random() - 0.5) * 2 * j;
          jLat += (Math.random() - 0.5) * 2 * j;

          const p = latLonToVector3(jLat, lon, CONFIG.continentRadius);

          positions.push(p.x, p.y, p.z);
          // Slightly lower max alpha to compensate for less additive overlap
          alphas.push(0.7 + Math.random() * 0.2);
          sizes.push(0.9 + Math.random() * 0.25);
        }
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geom.setAttribute("aAlpha", new THREE.Float32BufferAttribute(alphas, 1));
      geom.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColorA: { value: COLOR_DOT },
          uColorB: { value: COLOR_DOT_BRIGHT },
          uSize: { value: CONFIG.dotSize },
        },
        vertexShader: `
          attribute float aAlpha;
          attribute float aSize;
          varying float vAlpha;
          varying float vMix;
          uniform float uSize;

          void main() {
            vAlpha = aAlpha;
            vMix = aSize;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (uSize * aSize) * (300.0 / -mvPosition.z);
          }
        `,
        fragmentShader: `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vAlpha;
          varying float vMix;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;

            float soft = smoothstep(0.5, 0.16, d);
            vec3 color = mix(uColorA, uColorB, clamp(vMix - 0.9, 0.0, 1.0));
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

      // amber halo
      const haloMat = new THREE.PointsMaterial({
        color: COLOR_POI_GLOW,
        size: 0.14,
        transparent: true,
        opacity: 0.32,
        sizeAttenuation: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });
      const halos = new THREE.Points(geom, haloMat);
      globeGroup.add(halos);

      // white core
      const pointMat = new THREE.PointsMaterial({
        color: COLOR_POI,
        size: 0.06,
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

      // higher arcs than before
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
              trail = smoothstep(0.20, 0.0, head - vProgress) * 0.22;
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

      const ringGeom = new THREE.RingGeometry(0.016, 0.024, 48);
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

    // ===== MOUSE ORBITAL CAMERA =====
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
          poiData.haloMat.opacity = 0.24 + Math.sin(t * 2.2) * 0.04;
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
            arc.ring.scale.setScalar(1 + pulseT * 2.8);
            arc.ringMat.opacity = (1 - pulseT) * 0.95;
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

  // Accept numbers (treated as px) or strings (passed through as-is).
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
  return (
    <section className="rb-hero relative isolate overflow-visible px-4 pb-16 pt-40">
      <div className="rb-hero__bg">
        <div className="rb-hero__grid absolute inset-0" />
      </div>

      <div className="rb-hero__inner">
        <div className="rb-hero__content">
          <div className="rb-hero__left">
            <div className="rb-hero__badge">
              <span className="rb-hero__badge-dot" />
              <span>New: Automated Review Routing</span>
            </div>

            <h1 className="rb-hero__title">
              <span className="rb-hero__title-line">Boost Your Reviews</span>
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
              seconds.
            </p>

            <div className="rb-hero__actions">
              <CTAButton to="/signup" accent="green" mode="solid-hover-outline">
                Start Free Trial
              </CTAButton>
              <CTAButton to="/login" accent="purple" mode="hover-fill">
                See Demo
              </CTAButton>
            </div>

            <p className="rb-hero__note">
              14-day free trial. No credit card required.
            </p>

            <div className="rb-hero__trust-row">
              <span className="rb-hero__trust-pill">
                <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--primary" />
                Public review routing
              </span>
              <span className="rb-hero__trust-pill">
                <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--secondary" />
                Private feedback capture
              </span>
              <span className="rb-hero__trust-pill"> 
                <span className="rb-hero__trust-pill-dot rb-hero__trust-pill-dot--tertiary" />
                Automated follow-up ready
              </span>
            </div>
          </div>

          <div className="rb-hero__right">
            <div className="rb-hero-visual rb-hero-visual--orbit-core">
              {/*
                size    = target width at rest (px number or any CSS length string)
                maxSize = desktop ceiling; CSS breakpoints clamp lower on tablet/mobile
              */}
              <HeroVisual size={900} maxSize={1000} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroContent;
