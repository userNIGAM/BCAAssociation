import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import dns from 'dns';
dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany(); // optional (careful in production)

    const admins = [
      {
        name: "Admin One",
        email: "admin1@gmail.com",
        password: await bcrypt.hash("password123", 10),
      },
    ];

    await User.insertMany(admins);

    console.log("Admins seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmins();