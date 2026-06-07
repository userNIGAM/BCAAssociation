// controllers/messageController.js

import validator from "validator";
import { validationResult } from 'express-validator';
import Message from "../models/Message.js";

// Get all messages
export const getMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Message.countDocuments({})
    ]);

    res.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create new message
export const createMessage = async (req, res, next) => {
  try {
    // Check validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

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
    next(error);
  }
};

// Mark message as read
export const markAsRead = async (req, res, next) => {
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
    next(error);
  }
};

// Delete message
export const deleteMessage = async (req, res, next) => {
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
    next(error);
  }
};