/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded-lg w-1/4 mb-4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-lg w-5/6 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-lg w-4/6 animate-pulse" />
      </div>
    </motion.div>
  );
}