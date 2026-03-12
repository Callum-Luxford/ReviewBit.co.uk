import logo from "../../assets/images/logo-2.png";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaI,
} from "react-icons/fa6";

import SocialIcon from "../ui/SocialIcon";
// import facebookIcon from "../../assets/icons/fb.png"
// import xIcon from "../../assets/icons/x.png";
// import linkedinIcon from "../../assets/icons/linkedin.png";
// import instagramIcon from "../../assets/icons/instagram.png";

function Footer() {
  return (
    <footer className="footer bg-theme_clr_6 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo column */}
          <div>
            <a href="/" className="flex items-center gap-2 w-fit">
              <img src={logo} alt="reviewbear-logo" className="h-10 w-auto" />
              <p className="text-xl text-text_clr_1">
                Review
                <span className="font-semibold text-text_clr_1">Bear</span>
              </p>
            </a>

            <p className="mt-4 text-text_clr_3 max-w-xs">
              Collect more Google reviews with automated review requests and a
              frictionless customer flow.
            </p>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-text_clr_1 font-semibold mb-4">Contact</p>

            <ul className="space-y-3 text-text_clr_3">
              <li className="flex items-start gap-3">
                <span className="mt-[2px] opacity-70">☎</span>
                <span>+44 7386709495</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[2px] opacity-70">✉</span>
                <span>support@reviewbear.co.uk</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[2px] opacity-70">📍</span>
                <span>Essex, United Kingdom</span>
              </li>
            </ul>
          </div>

          {/* Overview column */}
          <div>
            <p className="text-text_clr_1 font-semibold mb-4">Overview</p>

            <ul className="space-y-3 text-text_clr_3">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-text_clr_1 transition"
                >
                  How it works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-text_clr_1 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-text_clr_1 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social column */}
          <div className="">
            <p className="text-text_clr_1 font-semibold mb-4">Social</p>
            <div className="flex gap-4">
              <SocialIcon href="#" Icon={FaFacebookF} label="Facebook" />
              <SocialIcon href="#" Icon={FaXTwitter} label="X" />
              <SocialIcon href="#" Icon={FaYoutube} label="YouTube" />
              <SocialIcon href="#" Icon={FaInstagram} label="Instagram" />
            </div>
            {/* <div className="flex gap-4">
              <SocialIcon href="#" image={facebookIcon} label="Facebook" />
              <SocialIcon href="#" image={xIcon} label="X" />
              <SocialIcon href="#" image={linkedinIcon} label="LinkedIn" />
            </div> */}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-text_clr_3">
            © {new Date().getFullYear()} ReviewBear. All rights reserved.
          </p>

          <div className="flex gap-6 text-text_clr_3">
            <a href="#privacy" className="hover:text-text_clr_1 transition">
              Privacy
            </a>
            <a href="#terms" className="hover:text-text_clr_1 transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
