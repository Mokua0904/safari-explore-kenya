import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    tourName: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    type: { type: String, default: "Safari" }, // "Safari", "Hotel", or "Transport"
    
    // Hotel specific fields
    checkIn: { type: String },
    checkOut: { type: String },
    nights: { type: Number },

    // Transport specific fields
    pickupLocation: { type: String },
    dropoffLocation: { type: String },
    date: { type: String },
    
    bookAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);