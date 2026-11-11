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
// Render provides a dynamic port. Fallback to 5000 for local development.
const port = process.env.PORT || 5000;

// CORS Configuration: Allow localhost AND your future Vercel frontend
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://192.168.0.15:3000", // Your mobile testing IP
    process.env.FRONTEND_URL // We will add this to Render later!
  ].filter(Boolean), 
  credentials: true,
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("error", (err) => console.log("MongoDB connection FAILED:", err.message));
connection.once("open", () => console.log("MongoDB connection successful! (Connected to Atlas)"));

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes Middleware
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});