import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// @desc    Register admin (protected by secret)
// @route   POST /api/auth/register
export const registerAdmin = async (req, res) => {
  const { name, email, password, adminSecret } = req.body;
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: 'Invalid admin secret' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword, role: 'admin' });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};