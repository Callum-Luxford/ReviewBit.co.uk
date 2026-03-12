import { FaGithub, FaDiscord, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="border-t border-[rgba(var(--terminal-green-rgb),0.18)] bg-[var(--theme-clr-2)]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="group flex items-center gap-3 w-fit">
              <div className="terminal-header-logo-box">
                <span className="text-sm font-medium">{">_"}</span>
              </div>

              <p className="terminal-header-logo-text">Review.sh</p>
            </a>

            <p className="terminal-footer-copy mt-6 max-w-[300px]">
              Empowering users with honest, data-driven product reviews and
              transparent feedback.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="terminal-footer-heading">Platform</p>

            <ul className="mt-5 space-y-3">
              <li>
                <a href="#reviews" className="terminal-footer-link">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="terminal-footer-link">
                  How_It_Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="terminal-footer-link">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="terminal-footer-heading">Company</p>

            <ul className="mt-5 space-y-3">
              <li>
                <a href="#about" className="terminal-footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="terminal-footer-link">
                  Contact
                </a>
              </li>
              <li>
                <a href="#pricing" className="terminal-footer-link">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="terminal-footer-heading">Connect</p>

            <div className="mt-5 flex items-center gap-4">
              <a href="#" aria-label="X" className="terminal-footer-social">
                <FaXTwitter />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="terminal-footer-social"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                aria-label="Discord"
                className="terminal-footer-social"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-[rgba(var(--terminal-green-rgb),0.18)]" />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="terminal-footer-meta">
            © {new Date().getFullYear()} Review.sh. All rights reserved.
          </p>

          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-8">
            <div className="terminal-footer-status">
              <span>System Status :</span>
              <span className="terminal-footer-status-dot" />
              <span className="terminal-footer-status-text">ONLINE</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#privacy" className="terminal-footer-meta-link">
                Privacy
              </a>
              <a href="#terms" className="terminal-footer-meta-link">
                Terms
              </a>
              <a href="#security" className="terminal-footer-meta-link">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
