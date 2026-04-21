// src/components/EventsSection.jsx
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Calendar, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
};

export default function EventsSection() {
  const [events, setEvents] = useLocalStorage("bca_events", [
    {
      id: uuidv4(),
      title: "Annual Tech Symposium",
      date: "2025-03-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      description: "Keynote by industry leaders on emerging tech.",
    },
    {
      id: uuidv4(),
      title: "Code Wars 2025",
      date: "2025-03-28",
      time: "2:00 PM",
      venue: "Computer Lab",
      description: "24-hour hackathon for BCA students.",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error("Title & Date required");
      return;
    }
    setEvents([{ id: uuidv4(), ...form }, ...events]);
    setForm({ title: "", date: "", time: "", venue: "", description: "" });
    setShowForm(false);
    toast.success("Event posted successfully");
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.success("Event removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Manage Events
          </h2>
          <p className="text-slate-500">Post upcoming association events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Event
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Title *"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:border-green-400"
                />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="px-4 py-2 rounded-xl border"
                />
                <input
                  type="text"
                  placeholder="Time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="px-4 py-2 rounded-xl border"
                />
                <input
                  type="text"
                  placeholder="Venue"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  className="px-4 py-2 rounded-xl border"
                />
              </div>
              <textarea
                placeholder="Description"
                rows="2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="px-4 py-2 rounded-xl border w-full"
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
                  className="bg-green-600 text-white px-5 py-2 rounded-xl"
                >
                  Post Event
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence>
          {events.map((ev) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -3 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-800">
                    {ev.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {ev.date}
                    </span>
                    {ev.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {ev.time}
                      </span>
                    )}
                    {ev.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {ev.venue}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-3 text-sm">
                    {ev.description}
                  </p>
                </div>
                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {events.length === 0 && (
        <div className="text-center py-12 glass-card rounded-2xl">
          <p className="text-slate-400">
            No events posted. Create your first event.
          </p>
        </div>
      )}
    </div>
  );
}
