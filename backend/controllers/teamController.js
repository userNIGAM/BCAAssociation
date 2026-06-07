import Team from '../models/Team.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { validationResult } from 'express-validator';

// helper: upload buffer to cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "team", timeout: 60000 },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.on('error', reject);
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const normalizeSocialLinks = (social_links) => {
  return {
    facebook: social_links?.facebook || "",
    instagram: social_links?.instagram || "",
    linkedin: social_links?.linkedin || "",
    twitter: social_links?.twitter || "",
    github: social_links?.github || "",
  };
};

const parseSocialLinks = (raw) => {
  if (!raw) return undefined;
  if (typeof raw === 'object') return raw;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
};

export const createTeamMember = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let imageUrl = "";

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(400).json({ 
          message: "Image upload failed: " + uploadError.message 
        });
      }
    }

    const rawSocialLinks = parseSocialLinks(req.body.social_links);
    const member = await Team.create({
      ...req.body,
      image: imageUrl,
      social_links: normalizeSocialLinks(rawSocialLinks),
    });

    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const member = await Team.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    let imageUrl = member.image;

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(400).json({ 
          message: "Image upload failed: " + uploadError.message 
        });
      }
    }

    const rawSocialLinks = parseSocialLinks(req.body.social_links);
    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        image: imageUrl,
        social_links: rawSocialLinks
          ? normalizeSocialLinks(rawSocialLinks)
          : member.social_links || {},
      },
      { returnDocument: "after", runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all team members (public)
// @route   GET /api/team
export const getTeamMembers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200); // Max 200

    // For frontend display, allow fetching all but with limit cap
    if (req.query.all === 'true') {
      const members = await Team.find({})
        .sort({ order: 1, createdAt: -1 })
        .limit(limit);
      const safeMembers = members.map((m) => ({
        ...m._doc,
        social_links: normalizeSocialLinks(m.social_links),
      }));
      return res.json(safeMembers);
    }

    // Normal paginated response
    const skip = (page - 1) * limit;
    const [members, total] = await Promise.all([
      Team.find({})
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Team.countDocuments({})
    ]);

    const safeMembers = members.map((m) => ({
      ...m._doc,
      social_links: normalizeSocialLinks(m.social_links),
    }));

    res.json({
      members: safeMembers,
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

export const deleteTeamMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await member.deleteOne();

    res.json({ message: 'Member removed' });
  } catch (error) {
    next(error);
  }
};