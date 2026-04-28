/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare } from "lucide-react";

import SectionHeader from "./SectionHeader";
import api from "../api/axios";

export default function ContactSection() {
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot field
  });

  // Form submission state
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) {
      return;
    }

    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      await api.post("/messages", formData);

      setFormData({
        name: "",
        email: "",
        message: "",
        website: "",
      });

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });

      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          isSuccess: false,
        }));
      }, 5000);
    } catch (error) {
      console.error(error);

      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <section id="contact" className="relative py-16 bg-gray-800">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-white"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title="Get in Touch" />

        <div className="flex justify-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="
              w-full 
              max-w-2xl
              bg-white/70
              backdrop-blur-md
              border border-white/30
              shadow-2xl
              rounded-2xl
              p-8
            "
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-6 text-gray-800"
            >
              Contact Us
            </motion.h3>

            {/* Success message */}
            {formState.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
              >
                Your message has been received. We'll get back to you soon!
              </motion.div>
            )}

            {/* Error message */}
            {formState.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                {formState.error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Field */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex="-1"
                className="hidden"
              />

              {/* Name */}
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="
                  flex items-center gap-3
                  border border-gray-300/70
                  rounded-xl
                  px-4 py-3
                  bg-white/60
                  backdrop-blur-sm
                  transition
                  focus-within:ring-2
                  focus-within:ring-yellow-500
                  focus-within:border-yellow-500
                "
              >
                <User className="text-gray-500" size={20} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={formState.isSubmitting}
                  required
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-gray-800
                    placeholder:text-gray-500
                  "
                />
              </motion.div>

              {/* Email */}
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="
                  flex items-center gap-3
                  border border-gray-300/70
                  rounded-xl
                  px-4 py-3
                  bg-white/60
                  backdrop-blur-sm
                  transition
                  focus-within:ring-2
                  focus-within:ring-yellow-500
                  focus-within:border-yellow-500
                "
              >
                <Mail className="text-gray-500" size={20} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  disabled={formState.isSubmitting}
                  required
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-gray-800
                    placeholder:text-gray-500
                  "
                />
              </motion.div>

              {/* Message */}
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="
                  flex gap-3
                  border border-gray-300/70
                  rounded-xl
                  px-4 py-3
                  bg-white/60
                  backdrop-blur-sm
                  transition
                  focus-within:ring-2
                  focus-within:ring-yellow-500
                  focus-within:border-yellow-500
                "
              >
                <MessageSquare className="text-gray-500 mt-1" size={20} />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message"
                  disabled={formState.isSubmitting}
                  required
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    resize-none
                    text-sm
                    text-gray-800
                    placeholder:text-gray-500
                  "
                />
              </motion.div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={formState.isSubmitting}
                className={`
                  w-full
                  bg-blue-900
                  text-white
                  py-3
                  rounded-xl
                  font-medium
                  transition
                  ${
                    formState.isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }
                `}
              >
                {formState.isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
