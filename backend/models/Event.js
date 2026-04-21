import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  venue: { type: String },
  banner: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);