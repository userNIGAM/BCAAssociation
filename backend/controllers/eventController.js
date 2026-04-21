import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  const events = await Event.find({ isActive: true }).sort({ date: -1 });
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  await event.deleteOne();
  res.json({ message: 'Event deleted' });
};