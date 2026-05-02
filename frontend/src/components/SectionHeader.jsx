/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
    </motion.div>
  );
}