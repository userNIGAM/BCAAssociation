import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-12 pb-6 mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Column 1 */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
              BCA Association MMC
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              Empowering students through community, collaboration, and excellence in technology.
            </p>
          </div>

          {/* Column 2 */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              Contact Us
            </h3>

            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Mechi Multiple Campus</span>
              </li>

              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href="mailto:bcaassociationmmc@gmail.com">
                  bcaassociationmmc@gmail.com
                </a>
              </li>

              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <a href="tel:+9779812345678">
                  +977-981-234-5678
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              Connect With Us
            </h3>

            <div className="flex justify-center sm:justify-start gap-5">

              {/* Facebook */}
              <a
                href="#"
                className="p-2 rounded-full bg-blue-100 text-blue-700 hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>

              {/* Gmail */}
              <a
                href="mailto:bcaassociationmmc@gmail.com"
                className="p-2 rounded-full bg-red-100 text-red-600 hover:scale-110 transition"
              >
                <Mail />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 rounded-full bg-blue-100 text-blue-800 hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>&copy; {new Date().getFullYear()} BCA Association MMC</p>

          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;