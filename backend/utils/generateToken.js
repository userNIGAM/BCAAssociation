import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  // Shorter expiry time (1 hour) for better security
  // Clients should implement refresh token mechanism for longer sessions
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

export default generateToken;