/* eslint-disable no-unused-vars */
// src/pages/Events.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { events } from "../../data/events";

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-10">
        Latest Events
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={event.banner}
              alt={event.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-blue-800">
                {event.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                {event.shortDesc}
              </p>

              <Link
                to={`/event/${event.id}`}
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;