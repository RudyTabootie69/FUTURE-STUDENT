import { Link } from "react-router-dom";
import { SectionWrapper } from "./SectionWrapper";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-blue mt-auto">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Future Student
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Your comprehensive platform for navigating the path to university.
              Simplify your future, one application at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/course-finder"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  Course Finder
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@futurestudent.com.au"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  support@futurestudent.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+611300123456"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  1300 123 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Future Student. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="#"
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
