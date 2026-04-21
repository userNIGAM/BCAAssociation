// src/components/NewsSection.jsx
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Newspaper, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* ------------------ LOCAL STORAGE HOOK (FIXED) ------------------ */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) return JSON.parse(item);

      // 👇 support function initializer
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

/* ------------------ COMPONENT ------------------ */
export default function NewsSection() {
  const [news, setNews] = useLocalStorage("bca_news", () => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    return [
      {
        id: uuidv4(),
        title: "BCA Association Launches Mentorship Program",
        content:
          "Senior students to guide juniors in career development and coding skills.",
        date: now.toISOString(),
      },
      {
        id: uuidv4(),
        title: "Registration Open for National Level Seminar",
        content:
          "Theme: Cybersecurity & Ethical Hacking. Limited seats available.",
        date: yesterday.toISOString(),
      },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  /* ------------------ HANDLERS ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      toast.error("Title and content required");
      return;
    }

    setNews([
      {
        id: uuidv4(),
        title: form.title,
        content: form.content,
        date: new Date().toISOString(),
      },
      ...news,
    ]);

    setForm({ title: "", content: "" });
    setShowForm(false);
    toast.success("News article published");
  };

  const deleteNews = (id) => {
    setNews(news.filter((n) => n.id !== id));
    toast.success("News removed");
  };

  /* ------------------ DATE FORMAT ------------------ */
  const formatDate = (iso) => {
    const date = new Date(iso);
    const today = new Date();

    const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            News & Announcements
          </h2>
          <p className="text-slate-500">Share updates with the BCA community</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-linear-to-r from-amber-600 to-orange-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Write News
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Headline *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-amber-400 outline-none"
              />

              <textarea
                placeholder="News content *"
                rows="4"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border outline-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-amber-600 text-white px-5 py-2 rounded-xl"
                >
                  Publish News
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* News List */}
      <div className="space-y-4">
        <AnimatePresence>
          {news.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(item.date)}
                  </div>

                  <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-amber-500" />
                    {item.title}
                  </h3>

                  <p className="text-slate-600 mt-3 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                <button
                  onClick={() => deleteNews(item.id)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {news.length === 0 && (
        <div className="text-center py-12 glass-card rounded-2xl">
          <p className="text-slate-400">
            No news articles. Post your first announcement.
          </p>
        </div>
      )}
    </div>
  );
}
