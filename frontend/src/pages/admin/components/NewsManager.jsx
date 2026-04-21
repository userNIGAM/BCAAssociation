import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
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
      const { data } = await api.get("/news");
      setNews(data);
    } catch (error) {
      toast.error("Failed to load news",error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`/news/${editing}`, form);
      else await api.post("/news", form);
      toast.success(editing ? "News updated" : "News created");
      setShowForm(false);
      setEditing(null);
      setForm({ title: "", content: "", image: "", isPublished: true });
      fetchNews();
    } catch (error) {
      toast.error("Operation failed",error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this news?")) {
      await api.delete(`/news/${id}`);
      toast.success("Deleted");
      fetchNews();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage News</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ title: "", content: "", image: "", isPublished: true });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add News
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border p-2 rounded"
            rows="5"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-1">{item.content.substring(0, 100)}...</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(item._id);
                  setForm(item);
                  setShowForm(true);
                }}
                className="text-blue-600"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
