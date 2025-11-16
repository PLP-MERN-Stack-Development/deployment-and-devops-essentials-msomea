import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import postRoutes from "./routes/postRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import { errorHandler } from "./errorhandler.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
    process.exit(1)
  }
};

// Run the server
function runServer() {
  try {
    connectDB();
    app.listen(PORT, () => console.table({
      MONGO_CONNECTED: mongoose.connection.readyState === 2 ? "Yes" : "No",
      MONGO_URI: process.env.MONGO_URI,
      PORT: process.env.PORT || 5000,
      SEVER_URL: `http://localhost:${PORT}`,
    }));
  } catch (error) {
    console.error("Error in starting the Server", error);
  }
};

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

runServer();
