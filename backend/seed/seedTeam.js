// backend/seed/TeamSeed.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import Team from "../models/Team.js";

dotenv.config();

await connectDb();

const teamMembers = [
  {
    name: "Shameer Kharel",
    email: "mmc1@example.com",
    designation: "President",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 1,
  },

  {
    name: "Enjila Poudel",
    email: "mmc2@example.com",
    designation: "Vice President",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 2,
  },

  {
    name: "Bibek Dhungel",
    email: "mmc3@example.com",
    designation: "Secretary",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 3,
  },

  // Vice Secretaries
  {
    name: "Sanket Siwakoti",
    email: "mmc4@example.com",
    designation: "Vice Secretary",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 4,
  },
  {
    name: "Saurav Bhattrai",
    email: "mmc5@example.com",
    designation: "Vice Secretary",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 5,
  },
  {
    name: "Prajwal Raimajhi",
    email: "mmc6@example.com",
    designation: "Vice Secretary",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 6,
  },

  {
    name: "Kiran Sitoula",
    email: "mmc7@example.com",
    designation: "Treasurer",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 7,
  },

  // Graphics Team
  {
    name: "Utsav Ghimire",
    email: "mmc8@example.com",
    designation: "Graphics Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 8,
  },
  {
    name: "Anup Upreti",
    email: "mmc9@example.com",
    designation: "Graphics Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 9,
  },
  {
    name: "Angel Pokhrel",
    email: "mmc10@example.com",
    designation: "Graphics Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 10,
  },
  {
    name: "Nemika Thapa",
    email: "mmc11@example.com",
    designation: "Graphics Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 11,
  },
  {
    name: "Kriti Neupane",
    email: "mmc12@example.com",
    designation: "Graphics Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 12,
  },

  // Tech Team
  {
    name: "Yangsing Limbu",
    email: "mmc13@example.com",
    designation: "Tech Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 13,
  },
  {
    name: "Nigam Subedi",
    email: "mmc14@example.com",
    designation: "Tech Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 14,
  },
  {
    name: "Roshan Shrestha",
    email: "mmc15@example.com",
    designation: "Tech Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 15,
  },
  {
    name: "Swayam Adhikari",
    email: "mmc16@example.com",
    designation: "Tech Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 16,
  },
  {
    name: "Bibek Shrestha",
    email: "mmc17@example.com",
    designation: "Tech Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 17,
  },

  // Executive Members
  {
    name: "Aakriti Nepal",
    email: "mmc18@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 18,
  },
  {
    name: "Adarsha Sapkota",
    email: "mmc19@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 19,
  },
  {
    name: "Prajjwal Gautam",
    email: "mmc20@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 20,
  },
  {
    name: "Pranish Sharma",
    email: "mmc21@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 21,
  },
  {
    name: "Kalyan Baral",
    email: "mmc22@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 22,
  },
  {
    name: "Lazima Ghising",
    email: "mmc23@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 23,
  },
  {
    name: "Himani Bhandari",
    email: "mmc24@example.com",
    designation: "Executive Member",
    bio: "mmc",
    address: "mmc",
    contact: "mmc",
    image: "mmc",
    order: 24,
  },
];

const seedTeam = async () => {
  try {
    await Team.deleteMany();

    await Team.insertMany(teamMembers);

    console.log("✅ Team members seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding team:", error);
    process.exit(1);
  }
};

seedTeam();