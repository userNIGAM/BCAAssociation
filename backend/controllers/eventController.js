import Event from '../models/Event.js';
import validator from 'validator';
import { validationResult } from 'express-validator';

// Allowed fields for updates (whitelist to prevent injection)
const ALLOWED_UPDATE_FIELDS = ['title', 'shortDesc', 'content', 'date', 'time', 'venue', 'banner', 'isActive'];

export const getEvents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Max 100
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find({ isActive: true })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Event.countDocuments({ isActive: true })
    ]);

    res.json({
      events,
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

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, shortDesc, content, date, time, venue, banner, isActive } = req.body;

    // Sanitize string inputs
    const sanitizedEvent = {
      title: validator.escape(title.trim()),
      shortDesc: validator.escape(shortDesc.trim()),
      content: validator.escape(content.trim()),
      date,
      time: time ? validator.escape(time.trim()) : '',
      venue: venue ? validator.escape(venue.trim()) : '',
      banner: banner ? banner.trim() : '',
      isActive: isActive !== undefined ? isActive : true
    };

    const event = await Event.create(sanitizedEvent);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Whitelist allowed fields - prevent NoSQL injection
    const updateData = {};
    ALLOWED_UPDATE_FIELDS.forEach(field => {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] === 'string') {
          updateData[field] = validator.escape(req.body[field].trim());
        } else {
          updateData[field] = req.body[field];
        }
      }
    });

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};