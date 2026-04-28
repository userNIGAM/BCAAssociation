// controllers/messageController.js

import validator from "validator";
import Message from "../models/Message.js";

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

// Create new message
export const createMessage = async (req, res) => {
  try {
    let { name, email, message, website } = req.body;

    // Honeypot spam protection
    if (website) {
      return res.status(400).json({
        message: "Spam detected",
      });
    }

    // Trim values
    name = name?.trim();
    email = email?.trim();
    message = message?.trim();

    // Required validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Name validation
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        message:
          "Name must be between 2 and 50 characters",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // Message validation
    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        message:
          "Message must be between 10 and 1000 characters",
      });
    }

    // Sanitize values
    const cleanName = validator.escape(name);
    const cleanEmail = validator.normalizeEmail(email);
    const cleanMessage = validator.escape(message);

    // Save to database
    const newMessage = await Message.create({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: {
        id: newMessage._id,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    message.isRead = true;

    await message.save();

    res.json({
      message: "Marked as read",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    await message.deleteOne();

    res.json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};