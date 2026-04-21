import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
};

export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newMessage = await Message.create({ name, email, message });
  res.status(201).json(newMessage);
};

export const markAsRead = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ message: 'Message not found' });
  message.isRead = true;
  await message.save();
  res.json({ message: 'Marked as read' });
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ message: 'Message not found' });
  await message.deleteOne();
  res.json({ message: 'Message deleted' });
};