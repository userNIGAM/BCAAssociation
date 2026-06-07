import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false, index: true }
}, { timestamps: true });

// Indexes for faster queries
messageSchema.index({ createdAt: -1 });
messageSchema.index({ isRead: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);