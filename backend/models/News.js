import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  image: {
    type: String,
    default: '',
    validate: {
      validator: function (v) {
        if (!v) return true;
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i.test(v);
      },
      message: 'Invalid image URL format'
    }
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
newsSchema.index({ createdAt: -1 });
newsSchema.index({ isPublished: 1, createdAt: -1 });

export default mongoose.model('News', newsSchema);