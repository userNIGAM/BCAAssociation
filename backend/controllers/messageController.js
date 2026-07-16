// controllers/messageController.js

import validator from "validator";
import Message from "../models/Message.js";
import asyncHandler from '../utils/asyncHandler.js';

// Get all messages
export const getMessages = asyncHandler(async (req, res) => {
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
});

// Create new message
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const cleanName = validator.escape(name);
  const cleanEmail = validator.normalizeEmail(email);
  const cleanMessage = validator.escape(message);

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
});

// Mark message as read
export const markAsRead = asyncHandler(async (req, res) => {
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
});

// Delete message
export const deleteMessage = asyncHandler(async (req, res) => {
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
});