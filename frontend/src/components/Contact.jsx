/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Have questions, ideas, or want to collaborate? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>

          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-black" />
            <span className="font-medium">bcaassociationmmc@gmail.com</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-5"
        >
          {/* Name */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2">
            <User size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* Message */}
          <div className="flex items-start border rounded-xl px-3 py-2 focus-within:ring-2">
            <MessageSquare size={18} className="text-gray-500 mr-2 mt-1" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full outline-none text-sm resize-none"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            <Send size={18} />
            Send Message
          </motion.button>

          {/* Success Message */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-sm text-center"
            >
              Message sent successfully! 🚀
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
