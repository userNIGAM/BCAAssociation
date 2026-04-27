import Team from '../models/Team.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

// helper: upload buffer to cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "team" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(fileBuffer);
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

export const createTeamMember = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      //  console.log("Uploaded to Cloudinary:", result.secure_url);

    }
const rawSocialLinks = parseSocialLinks(req.body.social_links);
    const member = await Team.create({
      ...req.body,
      image: imageUrl,
      social_links: normalizeSocialLinks(rawSocialLinks),

    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    let imageUrl = member.image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    const rawSocialLinks = parseSocialLinks(req.body.social_links);
    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      { ...req.body,
        image: imageUrl,
        social_links : rawSocialLinks
        ?normalizeSocialLinks(rawSocialLinks)
        :member.social_links || {},
      },
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all team members (public)
// @route   GET /api/team
export const getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find({}).sort({
      order: 1,
      createdAt: -1,
    });

    const safeMembers = members.map((m) => ({
      ...m._doc,
      social_links: normalizeSocialLinks(m.social_links),
    }));

    res.json(safeMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  await member.deleteOne();

  res.json({ message: 'Member removed' });
};