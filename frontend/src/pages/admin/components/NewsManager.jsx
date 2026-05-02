/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import ConfirmModal from "../../../components/ConfirmModal";

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    isPublished: true,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/news");
      setNews(data.news);
    } catch (error) {
      console.log(error)
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/admin/news/${editing}`, form);
        toast.success("News updated successfully");
      } else {
        await api.post("/admin/news", form);
        toast.success("News created successfully");
      }
      setShowForm(false);
      setEditing(null);
      setForm({ title: "", content: "", image: "", isPublished: true });
      fetchNews();
    } catch (error) {
      console.log(error)
      toast.error(editing ? "Failed to update" : "Failed to create");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/news/${deleteTarget}`);
      toast.success("News deleted successfully");
      setDeleteTarget(null);
      fetchNews();
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title,
      content: item.content,
      image: item.image || "",
      isPublished: item.isPublished,
    });
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Manage News
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditing(null);
            setForm({ title: "", content: "", image: "", isPublished: true });
            setShowForm(!showForm);
          }}
          className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition"
        >
          <Plus size={18} /> Add News
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8 space-y-4 border border-gray-100"
          >
            <input
              type="text"
              placeholder="News Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
            <textarea
              placeholder="News Content (HTML supported)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              rows="6"
              required
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full border border-gray-200 p-3 rounded-xl pl-10 focus:ring-2 focus:ring-blue-500 transition"
              />
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Publish immediately</span>
            </label>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-5 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl shadow-md"
              >
                {editing ? "Update News" : "Create News"}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
          >
            {item.image && (
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    {!item.isPublished && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <EyeOff size={14} /> Draft
                      </span>
                    )}
                    {item.isPublished && (
                      <span className="flex items-center gap-1 text-green-600">
                        <Eye size={14} /> Published
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{item.content.replace(/<[^>]*>/g, '').substring(0, 150)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete News"
        message="Are you sure you want to delete this news? This action cannot be undone."
      />
    </div>
  );
}