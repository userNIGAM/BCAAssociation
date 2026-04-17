import React from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

// Simple "Event Completed" component
const Completionist = () => (
  <span className="text-red-600 font-semibold">Event Started</span>
);

const NewsMain = ({ event }) => {
  if (!event) {
    throw new Error("Failed to Fetch Event.");
  }

  const isEventFromFuture = new Date(event?.date) > new Date();

  // Simple "time ago" function (no moment.js needed)
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value >= 1) {
        return `${value} ${key}${value > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <Completionist />;

    return (
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-4 text-green-900 rounded-lg text-center">
        {days > 0 && (
          <div className="flex flex-col items-center">
            <p className="text-2xl sm:text-4xl font-mono bg-gray-300 px-3 py-2 rounded-md">
              {String(days).padStart(2, "0")}
            </p>
            <p className="text-xs uppercase mt-1">Days</p>
          </div>
        )}

        {hours > 0 && (
          <div className="flex flex-col items-center">
            <p className="text-2xl sm:text-4xl font-mono bg-gray-300 px-3 py-2 rounded-md">
              {String(hours).padStart(2, "0")}
            </p>
            <p className="text-xs uppercase mt-1">Hours</p>
          </div>
        )}

        <div className="flex flex-col items-center">
          <p className="text-2xl sm:text-4xl font-mono bg-gray-300 px-3 py-2 rounded-md">
            {String(minutes).padStart(2, "0")}
          </p>
          <p className="text-xs uppercase mt-1">Minutes</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-2xl sm:text-4xl font-mono bg-gray-300 px-3 py-2 rounded-md">
            {String(seconds).padStart(2, "0")}
          </p>
          <p className="text-xs uppercase mt-1">Seconds</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
      
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-800">
          {event?.title}
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Posted {timeAgo(event?.createdAt)}
        </p>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/event"
          className="text-blue-600 hover:text-blue-800 transition"
        >
          ← Back to Event
        </Link>
      </div>

      {/* Banner */}
      <div className="w-full mb-6 sm:mb-8">
        <img
          src={event?.banner}
          alt={event?.title}
          className="rounded-lg shadow-lg w-full max-h-72 sm:max-h-96 object-cover"
        />
      </div>

      {/* Short Description */}
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
        {event?.shortDesc}
      </p>

      {/* Content */}
      <div
        className="mt-6 sm:mt-8 text-gray-800 text-base sm:text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: event?.content }}
      />

      {/* Countdown / Status */}
      <div className="flex justify-center items-center mt-8">
        {isEventFromFuture ? (
          <div className="flex flex-col gap-3 p-5 items-center bg-gray-100 rounded-lg w-full sm:w-auto">
            <p className="text-gray-600 text-base sm:text-lg">
              Event is Scheduled for
            </p>

            <Countdown
              date={new Date(event?.date)}
              renderer={renderer}
            />
          </div>
        ) : (
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md cursor-not-allowed">
            Event Ended
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsMain;