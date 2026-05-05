/* eslint-disable no-unused-vars */
import {
  Trash2,
  Edit2,
  Eye,
  EyeOff,
} from "lucide-react";

import { motion } from "framer-motion";

export default function NewsCard({
  item,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
              {item.title}
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <span>
                {new Date(item.createdAt).toLocaleDateString()}
              </span>

              {!item.isPublished ? (
                <span className="flex items-center gap-1 text-yellow-600">
                  <EyeOff size={14} />
                  Draft
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-600">
                  <Eye size={14} />
                  Published
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <Edit2 size={18} />
            </button>

            <button
              onClick={() => onDelete(item._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {item.content
            .replace(/<[^>]*>/g, "")
            .substring(0, 150)}
        </p>
      </div>
    </motion.div>
  );
}