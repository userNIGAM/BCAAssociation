/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/messages", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-80 px-4 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 mb-6">
            Have questions, ideas, or want to collaborate? We'd love to hear
            from you.
          </p>
          <div className="flex items-center gap-3">
            <Mail className="text-black" />
            <span className="font-medium text-blue-700">
              bcaassociationmmc@gmail.com
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 space-y-5"
        >
          <div className="flex items-center border rounded-xl px-3 py-2">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-start border rounded-xl px-3 py-2">
            <MessageSquare size={18} className="text-gray-500 mr-2 mt-1" />
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your Message"
              rows="4"
              className="w-full outline-none resize-none"
              required
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
