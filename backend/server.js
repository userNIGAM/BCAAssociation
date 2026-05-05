import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import newsRoutes from './routes/newsRoutes.js';           // public news routes
import adminNewsRoutes from './routes/adminNewsRoutes.js'; // admin news routes
import eventRoutes from './routes/eventRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDb();

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  "http://localhost:5173"
]);

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.has(origin)) {
      cb(null, true);
    } else {
      cb(new Error("CORS blocked"));
    }
  },
  credentials: true
}));
app.use(express.json());

// ========== ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/news', newsRoutes);               // GET /api/news and /api/news/:id (public)
app.use('/api/admin/news', adminNewsRoutes);    // All admin CRUD operations (protected)
app.use('/api/events', eventRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('BCA Association API is running...');
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));