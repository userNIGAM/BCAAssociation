/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Teams', path: '/teams' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">BCA Association MMC</h1>
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-800'}`}>
              {link.name}
            </NavLink>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-gray-200">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden px-6 pb-6">
            <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-4">
              {links.map(link => (
                <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)} className={({ isActive }) => `text-base font-medium py-2 px-3 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : ''}`}>
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