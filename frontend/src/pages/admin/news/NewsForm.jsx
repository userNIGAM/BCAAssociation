/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Upload } from "lucide-react";

export default function NewsForm({
  showForm,
  form,
  setForm,
  editing,
  onSubmit,
  onCancel,
}) {
  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 5MB limit
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    setForm({
      ...form,
      imageFile: file,
      preview: URL.createObjectURL(file),
    });
  };

  return (
    <AnimatePresence>
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={onSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 space-y-4 border border-gray-100"
        >
          <input
            type="text"
            placeholder="News Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 p-3 rounded-xl"
            required
          />

          <textarea
            placeholder="News Content (HTML supported)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border border-gray-200 p-3 rounded-xl"
            rows="6"
            required
          />

          {/* Image URL */}
          <div className="relative">
            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-xl pl-10"
            />

            <ImageIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Choose File */}
          <div className="border border-dashed border-gray-300 rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-pointer text-gray-700">
              <Upload size={18} />

              <span>Choose Image File (Max 5MB)</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {form.imageFile && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {form.imageFile.name}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {form.preview && (
            <img
              src={form.preview}
              alt="Preview"
              className="w-full h-52 object-cover rounded-xl border"
            />
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) =>
                setForm({
                  ...form,
                  isPublished: e.target.checked,
                })
              }
              className="w-5 h-5 text-blue-600 rounded"
            />

            <span className="text-gray-700">Publish immediately</span>
          </label>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 border border-gray-300 rounded-xl"
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-5 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl"
            >
              {editing ? "Update News" : "Create News"}
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
