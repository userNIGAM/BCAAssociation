/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center my-12">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-blue-800">{title}</motion.h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      <div className="mt-4 mx-auto w-20 h-1 bg-blue-800 rounded"></div>
    </div>
  );
}