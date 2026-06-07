import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
    process.exit(1);
  }
}