/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-700"
      />
    </div>
  );
}