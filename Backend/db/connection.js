const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);

  } catch (err) {
    console.error(err);
    throw new Error("MongoDB Connection Error");
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
  } catch (err) {
    console.error(err);
    throw new Error("MongoDB Disconnection Error");
  }
};

module.exports = { connectDB, disconnectDB };
