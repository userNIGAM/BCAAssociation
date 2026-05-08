import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// @desc    Register admin (protected by secret)
// @route   POST /api/auth/register
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, adminSecret } = req.body;
    
    // Validate input
    if (!name || !email || !password || !adminSecret) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin secret' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: 'admin' 
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};