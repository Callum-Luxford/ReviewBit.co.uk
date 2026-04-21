import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Squash } from "hamburger-react";
import { useAuthBoot } from "../../context/AuthBootContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAuthButton, setActiveAuthButton] = useState("signup");

  const location = useLocation();
  const { startAuthBoot } = useAuthBoot();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function getAuthBtnClass(buttonName) {
    const isActive = activeAuthButton === buttonName;
    return isActive ? "terminal-auth-btn-active" : "terminal-auth-btn-inactive";
  }

  return (
    <header className="terminal-site-header fixed top-0 left-0 z-[9998] w-full h-24">
      <div
        className={`terminal-site-header__bg absolute inset-0 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(14,14,14,0.92)] backdrop-blur-md"
            : "bg-[rgba(14,14,14,0.82)] backdrop-blur-sm"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Nav */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-2/3 max-w-[320px] transform border-l border-[var(--ui-line)] bg-[var(--theme-clr-2)] transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="mt-24 flex flex-col gap-4 p-6 text-[#e5e7eb]">
          {!isAuthPage && (
            <>
              <a
                href="#reviews"
                onClick={closeMenu}
                className="terminal-nav-link"
              >
                Reviews
              </a>

              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="terminal-nav-link"
              >
                How_It_Works
              </a>

              <a
                href="#testimonials"
                onClick={closeMenu}
                className="terminal-nav-link"
              >
                Testimonials
              </a>
            </>
          )}

          <div
            className="mt-2 flex flex-col gap-3"
            onMouseLeave={() => setActiveAuthButton("signup")}
          >
            <button
              type="button"
              onClick={() => {
                closeMenu();
                startAuthBoot("login");
              }}
              onMouseEnter={() => setActiveAuthButton("login")}
              className={`terminal-auth-btn ${getAuthBtnClass("login")}`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                startAuthBoot("signup");
              }}
              onMouseEnter={() => setActiveAuthButton("signup")}
              className={`terminal-auth-btn ${getAuthBtnClass("signup")}`}
            >
              Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div className="terminal-site-shell relative mx-auto h-full max-w-[1400px] px-4 md:px-6">
        <div className="relative flex h-full items-center">
          {/* LEFT SEGMENT */}
          <div className="terminal-site-header__segment terminal-site-header__segment--left flex h-full items-center pr-6">
            <Link to="/" className="group flex items-center gap-3">
              <div className="terminal-header-logo-box">
                <span className="text-sm font-medium">{">_"}</span>
              </div>

              <p className="terminal-header-logo-text">ReviewBit.co.uk</p>
            </Link>
          </div>

          {/* CENTER SEGMENT - desktop only */}
          {!isAuthPage && (
            <nav className="terminal-site-header__center-nav absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center md:flex">
              <a href="#reviews" className="terminal-nav-link">
                Reviews
              </a>

              <a href="#how-it-works" className="terminal-nav-link">
                How_It_Works
              </a>

              <a href="#testimonials" className="terminal-nav-link">
                Testimonials
              </a>
            </nav>
          )}

          {/* RIGHT SEGMENT */}
          <div className="terminal-site-header__segment terminal-site-header__segment--right ml-auto hidden h-full items-center pl-6 md:flex">
            <div
              className="flex items-center gap-3"
              onMouseLeave={() => setActiveAuthButton("signup")}
            >
              <button
                type="button"
                onClick={() => startAuthBoot("login")}
                onMouseEnter={() => setActiveAuthButton("login")}
                className={`terminal-auth-btn ${getAuthBtnClass("login")}`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => startAuthBoot("signup")}
                onMouseEnter={() => setActiveAuthButton("signup")}
                className={`terminal-auth-btn ${getAuthBtnClass("signup")}`}
              >
                Signup
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="absolute right-0 top-1/2 z-[10000] -translate-y-1/2 md:hidden">
            <Squash
              toggled={menuOpen}
              toggle={setMenuOpen}
              size={24}
              color="rgb(var(--accent-primary-rgb))"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;