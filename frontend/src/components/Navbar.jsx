/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    "Teams",
    "About Us",
    "Contact Us",
    "Model Question",
    "Events",
    "Notice",
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">BCA Association</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ y: -2 }}
              className="text-sm font-medium relative group"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </motion.a>
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
                <motion.a
                  key={index}
                  href="#"
                  whileTap={{ scale: 0.95 }}
                  className="text-base font-medium py-2 px-3 rounded-lg hover:bg-gray-100"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
