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
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    github: { type: String, default: "" },
  },
  order: { type: Number, default: 0 } // for sorting
}, { timestamps: true });


teamSchema.pre('save', function () {
  if (this.social_links) {
    this.social_links = {
      facebook: this.social_links.facebook || '',
      instagram: this.social_links.instagram || '',
      linkedin: this.social_links.linkedin || '',
      twitter: this.social_links.twitter || '',
      github: this.social_links.github || '',
    };
  } else {
    this.social_links = { facebook: '', instagram: '', linkedin: '', twitter: '', github: '' };
  }

});

// handle findOneAndUpdate
teamSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  if (update.social_links) {
    update.social_links = {
      facebook: update.social_links.facebook || '',
      instagram: update.social_links.instagram || '',
      linkedin: update.social_links.linkedin || '',
      twitter: update.social_links.twitter || '',
      github: update.social_links.github || '',
    };
  } else if (!update.$set?.social_links && !update.social_links) {
    // Ensure field exists if not provided
    if (!update.$set) update.$set = {};
    update.$set.social_links = { facebook: '', instagram: '', linkedin: '', twitter: '', github: '' };
  }
  
});

export default mongoose.model('Team', teamSchema);