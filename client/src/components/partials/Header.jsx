import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Squash } from "hamburger-react";
import { useAuthBoot } from "../../context/AuthBootContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAuthButton, setActiveAuthButton] = useState("signup");
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const { startAuthBoot } = useAuthBoot();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

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
    <header className="fixed top-0 left-0 z-[9998] w-full h-24">
      {/* background */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0e14]/90 backdrop-blur-md"
            : "bg-[#0a0e14]/70 backdrop-blur-sm"
        }`}
      />

      {/* bottom terminal separator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div className="h-[6px] w-[34%] bg-[rgba(var(--terminal-green-rgb),0.22)] blur-md" />
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(var(--terminal-green-rgb),0.55)] to-transparent" />
      </div>

      {/* Mobile Nav */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-2/3 max-w-[320px] transform border-l border-[rgba(var(--terminal-green-rgb),0.20)] bg-theme_clr_2 transition-transform duration-300 ease-in-out ${
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

      <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="terminal-header-logo-box">
            <span className="text-sm font-medium">{">_"}</span>
          </div>

          {/* <p className="terminal-header-logo-text">Revbotic</p> */}
          <p className="terminal-header-logo-text">ReviewBit.co.uk</p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {!isAuthPage && (
            <>
              <a href="#reviews" className="terminal-nav-link">
                Reviews
              </a>

              <a href="#how-it-works" className="terminal-nav-link">
                How_It_Works
              </a>

              <a href="#testimonials" className="terminal-nav-link">
                Testimonials
              </a>
            </>
          )}

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
        </nav>

        {/* Mobile Toggle */}
        <div className="absolute right-4 top-1/2 z-[10000] -translate-y-1/2 md:hidden">
          <Squash
            toggled={menuOpen}
            toggle={setMenuOpen}
            size={24}
            color="rgb(var(--terminal-green-rgb))"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
