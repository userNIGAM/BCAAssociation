import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  designation: {
    type: String,
    enum: [
      'President', 'Vice President', 'Secretary', 'Vice Secretary',
      'Treasurer', 'Tech Lead', 'Tech Member', 'Graphics Lead',
      'Graphics Member', 'Executive Member'
    ],
    required: true
  },
  bio: { type: String },
  address: { type: String },
  contact: { type: String },
  image: { type: String, default: '' },
  social_links: {
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    github : String
  },
  order: { type: Number, default: 0 } // for sorting
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);