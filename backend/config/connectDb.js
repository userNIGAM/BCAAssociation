import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
dotenv.config();

const RETRY_INTERVAL = 5000; // Retry every 5 seconds
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Use Google's and Cloudflare's DNS servers

const connectDb = async () => {
  while (true) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
      mongoose.connection.on("disconnected", () => {
        console.error("⚠️ MongoDB disconnected! Attempting to reconnect...");
      });

      mongoose.connection.on("reconnected", () => {
        console.log("✅ MongoDB reconnected!");
      });
      break; // Exit the loop if connection is successful
    } catch (error) {
      console.log(error)
      console.error(
        `❌ MongoDB connection failed. Retrying in ${
          RETRY_INTERVAL / 1000
        } seconds...`,
      );

      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
};

export default connectDb;