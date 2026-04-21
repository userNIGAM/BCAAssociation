import mongoose from 'mongoose';

const newsSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('News', newsSchema);