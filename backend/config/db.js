const mongoose = require("mongoose");
const { setServers } = require("node:dns/promises");

const connectDB = async () => {
  try {
    // Use Cloudflare and Google DNS
    await setServers(["1.1.1.1", "8.8.8.8"]);

    const mongoURI =
      process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/appointment_booking_db";

    const conn = await mongoose.connect(mongoURI);

    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    console.warn(
      "[MongoDB] Server is running, but database operations will fail until MongoDB is connected.",
    );
    console.warn(
      "[MongoDB Tip] Update MONGODB_URI in backend/.env with your MongoDB Atlas string or start local MongoDB.",
    );
  }
};

module.exports = connectDB;
