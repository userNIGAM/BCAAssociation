/* eslint-disable no-unused-vars */
// src/pages/EventDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { events } from "../../data/events";
import { motion } from "framer-motion";
import Countdown from "react-countdown";

const Completionist = () => (
  <span className="text-red-600 font-semibold">Event Started</span>
);

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) return <p>Event not found</p>;

  const isFuture = new Date(event.date) > new Date();

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <Completionist />;

    return (
      <div className="flex gap-3 flex-wrap justify-center">
        {[days, hours, minutes, seconds].map((val, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl sm:text-4xl bg-gray-200 px-3 py-2 rounded">
              {String(val).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <Link to="/event" className="text-blue-600">← Back</Link>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl sm:text-4xl font-bold text-blue-800 mt-4"
      >
        {event.title}
      </motion.h1>

      <motion.img
        src={event.banner}
        alt={event.title}
        className="w-full h-60 sm:h-96 object-cover rounded-xl mt-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      />

      <p className="mt-6 text-gray-700">{event.shortDesc}</p>

      <div
        className="mt-6 text-gray-800"
        dangerouslySetInnerHTML={{ __html: event.content }}
      />

      <div className="mt-10 text-center">
        {isFuture ? (
          <Countdown date={new Date(event.date)} renderer={renderer} />
        ) : (
          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            Event Ended
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default EventDetails;