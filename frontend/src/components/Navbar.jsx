/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Model Question", path: "/model-question" },
    { name: "Events", path: "/events" },
    { name: "Notice", path: "/notice" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          BCA Association
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, index) => (
            <motion.div key={index} whileHover={{ y: -2 }}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium relative group transition ${
                    isActive ? "text-blue-600" : "text-gray-800"
                  }`
                }
              >
                {link.name}

                {/* Animated underline */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-gray-200 transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-6"
          >
            <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-4">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium py-2 px-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}