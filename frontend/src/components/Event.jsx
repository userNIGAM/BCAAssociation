/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Tech Innovation Summit",
    date: "March 12, 2025",
    location: "Kathmandu",
    description: "A gathering of innovators discussing AI, robotics, and the future of technology.",
  },
  {
    title: "Startup Pitch Fest",
    date: "January 28, 2025",
    location: "Pokhara",
    description: "Young entrepreneurs pitched their startup ideas to investors and mentors.",
  },
  {
    title: "Web Development Bootcamp",
    date: "December 10, 2024",
    location: "Chitwan",
    description: "Hands-on training on modern web technologies including React and Tailwind.",
  },
  {
    title: "Design Thinking Workshop",
    date: "November 5, 2024",
    location: "Lalitpur",
    description: "Interactive workshop focused on creative problem-solving and UX design.",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Events
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the events we have successfully organized. From tech talks to workshops, we create impactful experiences.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-3">
                {event.title}
              </h2>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Calendar size={16} />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>

              <p className="text-gray-600 text-sm grow">
                {event.description}
              </p>

              <button className="mt-5 text-sm font-medium px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
