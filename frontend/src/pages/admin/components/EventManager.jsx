import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    content: "",
    date: "",
    time: "",
    venue: "",
    banner: "",
    isActive: true,
  });

  const fetchEvents = async () => {
    const { data } = await api.get("/events");
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`/events/${editing}`, form);
      else await api.post("/events", form);
      toast.success("Saved");
      setShowForm(false);
      setEditing(null);
      setForm({
        title: "",
        shortDesc: "",
        content: "",
        date: "",
        time: "",
        venue: "",
        banner: "",
        isActive: true,
      });
      fetchEvents();
    } catch (error) {
      toast.error("Failed",error);
    }
  };
  const handleDelete = async (id) => {
    if (confirm("Delete?")) {
      await api.delete(`/events/${id}`);
      toast.success("Deleted");
      fetchEvents();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              title: "",
              shortDesc: "",
              content: "",
              date: "",
              time: "",
              venue: "",
              banner: "",
              isActive: true,
            });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
        >
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            placeholder="Short Description"
            value={form.shortDesc}
            onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Full Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows="4"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            placeholder="Time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Banner URL"
            value={form.banner}
            onChange={(e) => setForm({ ...form, banner: e.target.value })}
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
        {events.map((ev) => (
          <div
            key={ev._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{ev.title}</h3>
              <p>
                {new Date(ev.date).toLocaleDateString()}{" "}
                {ev.venue && `• ${ev.venue}`}
              </p>
              <p className="text-sm text-gray-600">{ev.shortDesc}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(ev._id);
                  setForm(ev);
                  setShowForm(true);
                }}
              >
                <Edit2 size={18} className="text-blue-600" />
              </button>
              <button onClick={() => handleDelete(ev._id)}>
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
