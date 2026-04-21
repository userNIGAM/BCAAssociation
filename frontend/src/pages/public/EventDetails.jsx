/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Countdown from "react-countdown";
import api from "../../api/axios";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!event) return <div className="text-center py-20">Event not found</div>;

  const isFuture = new Date(event.date) > new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Link to="/events" className="text-blue-600">
        ← Back to Events
      </Link>
      <h1 className="text-3xl font-bold text-blue-800 mt-4">{event.title}</h1>
      <img
        src={event.banner || "/association.png"}
        alt={event.title}
        className="w-full h-64 object-cover rounded-xl my-6"
      />
      <p className="text-gray-600">
        {new Date(event.date).toLocaleDateString()}{" "}
        {event.time && `at ${event.time}`} • {event.venue}
      </p>
      <p className="mt-4 text-gray-700">{event.shortDesc}</p>
      <div
        className="mt-6 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: event.content }}
      />
      {isFuture && (
        <div className="mt-10 text-center">
          <Countdown
            date={new Date(event.date)}
            renderer={({ days, hours, minutes, seconds, completed }) =>
              completed ? (
                <span className="text-red-600">Event Started</span>
              ) : (
                <div className="flex gap-3 justify-center text-2xl font-mono">
                  {days}d {hours}h {minutes}m {seconds}s
                </div>
              )
            }
          />
        </div>
      )}
    </div>
  );
}
