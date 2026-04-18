import {Team} from "../models/Team.js";
import dotenv from "dotenv";

dotenv.config();

export const registerTeam = async (req, res) => {
  const { name, email, bio, designation, address, contact } = req.body;

  try {
    // Validation
    if (!name || !email || !bio || !designation || !address || !contact) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check existing user
    const existingUser = await Team.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    // Create new team member
    const newMember = await Team.create({
      name,
      email,
      bio,
      designation,
      address,
      contact,
    });

    return res.status(201).json({
      message: "Team member registered successfully!",
      data: newMember,
    });

  } catch (error) {
    console.error("Error registering team:", error);
    return res.status(500).json({ message: "Server error" });
  }
};