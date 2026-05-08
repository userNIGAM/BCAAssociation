import Event from '../models/Event.js';

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
    const { title, shortDesc, content, date, time, venue, banner } = req.body;

    // Validation
    if (!title || !shortDesc || !content || !date) {
      return res.status(400).json({ 
        message: 'Title, short description, content, and date are required' 
      });
    }

    if (title.length > 200) {
      return res.status(400).json({ message: 'Title cannot exceed 200 characters' });
    }

    const event = await Event.create({
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      content: content.trim(),
      date,
      time: time ? time.trim() : '',
      venue: venue ? venue.trim() : '',
      banner: banner ? banner.trim() : '',
      isActive: true
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, shortDesc, content, date, time, venue, banner, isActive } = req.body;

    // Validate if provided
    if (title && title.length > 200) {
      return res.status(400).json({ message: 'Title cannot exceed 200 characters' });
    }

    // Update only provided fields
    if (title) event.title = title.trim();
    if (shortDesc) event.shortDesc = shortDesc.trim();
    if (content) event.content = content.trim();
    if (date) event.date = date;
    if (time) event.time = time.trim();
    if (venue) event.venue = venue.trim();
    if (banner) event.banner = banner.trim();
    if (isActive !== undefined) event.isActive = isActive;

    const updated = await event.save();
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