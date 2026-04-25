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

export const createTeamMember = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const member = await Team.create({
      ...req.body,
      image: imageUrl,
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

    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
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
  const members = await Team.find({}).sort({ order: 1, createdAt: -1 });
  res.json(members);
};

// // @desc    Create team member (admin)
// // @route   POST /api/team
// export const createTeamMember = async (req, res) => {
//   const {
//     name,
//     email,
//     designation,
//     bio,
//     address,
//     contact,
//     image,
//     social_links,
//     order,
//   } = req.body;

//   const member = await Team.create({
//     name,
//     email,
//     designation,
//     bio,
//     address,
//     contact,
//     image,
//     social_links,
//     order,
//   });

//   res.status(201).json(member);
// };

// // @desc    Update team member (admin)
// // @route   PUT /api/team/:id
// export const updateTeamMember = async (req, res) => {
//   const member = await Team.findById(req.params.id);

//   if (!member) {
//     return res.status(404).json({ message: 'Member not found' });
//   }

//   const updated = await Team.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { returnDocument: 'after' }
//   );

//   res.json(updated);
// };

// @desc    Delete team member (admin)
// @route   DELETE /api/team/:id
export const deleteTeamMember = async (req, res) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  await member.deleteOne();

  res.json({ message: 'Member removed' });
};