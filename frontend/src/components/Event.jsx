/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import SectionHeader from "../components/SectionHeader";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");

        const eventsData = Array.isArray(response.data)
          ? response.data
          : response.data.events || [];

        setEvents(eventsData);
      } catch (error) {
        console.error(error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading events...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
      <SectionHeader title="Our Events" subtitle="Past and upcoming events" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <motion.div
            key={event._id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {event.banner && (
              <img
                src={event.banner}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-800">
                {event.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}{" "}
                {event.time && `• ${event.time}`}
              </p>
              <p className="mt-2 text-gray-600">
                {event.shortDesc.substring(0, 100)}...
              </p>
              <Link
                to={`/event/${event._id}`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
