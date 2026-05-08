import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  shortDesc: { 
    type: String, 
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'],
    trim: true
  },
  date: { 
    type: Date, 
    required: [true, 'Date is required']
  },
  time: { 
    type: String,
    trim: true
  },
  venue: { 
    type: String,
    trim: true
  },
  banner: { 
    type: String, 
    default: ''
  },
  isActive: { 
    type: Boolean, 
    default: true
  }
}, { timestamps: true });

// Index for faster queries
eventSchema.index({ isActive: 1, date: -1 });

export default mongoose.model('Event', eventSchema);