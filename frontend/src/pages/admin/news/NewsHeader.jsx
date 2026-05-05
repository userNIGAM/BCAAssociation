/* eslint-disable no-unused-vars */
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsHeader({ onAddClick }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Manage News
      </h2>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddClick}
        className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition"
      >
        <Plus size={18} />
        Add News
      </motion.button>
    </div>
  );
}
