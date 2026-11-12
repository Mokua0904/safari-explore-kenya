import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes Imports
import tourRoute from "./routes/tour.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import hotelRoute from "./routes/hotel.js";
import transportRoute from "./routes/transport.js";
import productRoute from "./routes/product.js";

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://192.168.0.15:3000",
    process.env.FRONTEND_URL 
  ].filter(Boolean), 
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// 1. Start the HTTP server FIRST so Render sees it immediately (no 502 error)
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// 2. Connect to MongoDB in the background
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Fail fast if it can't connect
})
.then(() => {
  console.log("MongoDB connection successful! (Connected to Atlas)");
  
  // 3. ONLY mount the routes AFTER the database is connected
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/tours", tourRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/review", reviewRoute);
  app.use("/api/v1/booking", bookingRoute);
  app.use("/api/v1/hotels", hotelRoute);
  app.use("/api/v1/transport", transportRoute);
  app.use("/api/v1/products", productRoute); 

  app.get("/", (req, res) => {
    res.send("Safari Explore Kenya API is running!");
  });
})
.catch((err) => {
  console.error("MongoDB connection FAILED:", err.message);
  // If connection fails, we still keep the server running to show the error
  app.get("/", (req, res) => {
    res.status(500).send("Database connection failed. Check logs.");
  });
});