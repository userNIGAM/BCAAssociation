import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Don't return password by default
  },
  role: { 
    type: String, 
    default: 'admin',
    enum: ['admin']
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);