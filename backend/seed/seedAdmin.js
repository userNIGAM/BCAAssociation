import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Admin.deleteMany(); // optional (careful in production)

    const admins = [
      {
        name: "Admin One",
        email: "admin1@gmail.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        name: "Admin Two",
        email: "admin2@gmail.com",
        password: await bcrypt.hash("password123", 10),
      },
    ];

    await Admin.insertMany(admins);

    console.log("Admins seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmins();