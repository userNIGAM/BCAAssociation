import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "../models/Event.js";

dotenv.config();

// sample events data
const events = [
  {
    title: "Welcome Program 2026",
    shortDesc: "Orientation for new BCA students",
    content: "This event welcomes new students with introductions, faculty interaction, and activities.",
    date: new Date("2026-05-10"),
    time: "10:00 AM",
    venue: "BCA Hall",
    banner: "",
    isActive: true
  },
  {
    title: "Tech Talk: MERN Stack",
    shortDesc: "Learn modern web development",
    content: "A deep dive into MERN stack development with real-world projects.",
    date: new Date("2026-06-01"),
    time: "2:00 PM",
    venue: "Lab 3",
    banner: "",
    isActive: true
  },
  {
    title: "Coding Competition",
    shortDesc: "Annual coding contest",
    content: "Compete with peers and win exciting prizes in our coding challenge.",
    date: new Date("2026-06-15"),
    time: "9:00 AM",
    venue: "Computer Lab",
    banner: "",
    isActive: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🟡 Connected to DB");

    // optional: clear old events
    await Event.deleteMany();

    console.log("🧹 Old events cleared");

    // insert new events
    await Event.insertMany(events);

    console.log("🌱 Events seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedDB();