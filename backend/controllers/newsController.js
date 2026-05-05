import News from '../models/News.js';
import { sanitizeNewsInput } from '../utils/sanitize.js';
import { validationResult } from 'express-validator';
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc    Get published news with pagination
// @route   GET /api/news
// @access  Public
export const getNews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      News.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments({ isPublished: true })
    ]);

    res.json({
      news,
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

// @desc    Get single news by ID
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = async (req, res, next) => {
  try {
    const newsItem = await News.findById(req.params.id).lean();
    
    if (!newsItem) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Increment views asynchronously (don't await to avoid blocking)
    News.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).exec();

    res.json(newsItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Create news (Admin only)
// @route   POST /api/admin/news
// @access  Private/Admin
export const createNews = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    let imageUrl = "";

    // uploaded file
    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "news"
      );

      imageUrl = uploaded.secure_url;
    }

    // external URL fallback
    else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const news = await News.create({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
      isPublished:
        req.body.isPublished === "true" ||
        req.body.isPublished === true,
    });

    res.status(201).json(news);

  } catch (error) {
    next(error);
  }
};

// @desc    Update news (Admin only)
// @route   PUT /api/admin/news/:id
// @access  Private/Admin
export const updateNews = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    let imageUrl = news.image;

    // new uploaded image
    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "news"
      );

      imageUrl = uploaded.secure_url;
    }

    // external image URL
    else if (req.body.image) {
      imageUrl = req.body.image;
    }

    news.title = req.body.title;
    news.content = req.body.content;
    news.image = imageUrl;

    news.isPublished =
      req.body.isPublished === "true" ||
      req.body.isPublished === true;

    const updated = await news.save();

    res.json(updated);

  } catch (error) {
    next(error);
  }
};

// @desc    Delete news (Admin only)
// @route   DELETE /api/admin/news/:id
// @access  Private/Admin
export const deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    await news.deleteOne();

    res.json({
      message: "News deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};
// @desc    Get all news (including unpublished) for admin
// @route   GET /api/admin/news
// @access  Private/Admin
export const getAllNewsAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      News.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments()
    ]);

    res.json({
      news,
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