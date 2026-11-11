import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String },
    userEmail: { type: String },
    tourName: { type: String },
    fullName: { type: String },
    phone: { type: String },
    guests: { type: Number },
    totalPrice: { type: Number },
    type: { type: String }, // Safari, Hotel, Transport
    paymentMethod: { type: String }, // Mpesa, Card
    
    // Hotel specific
    checkIn: { type: String },
    checkOut: { type: String },
    nights: { type: Number },

    // Transport specific
    pickupLocation: { type: String },
    dropoffLocation: { type: String },
    date: { type: String },
    
    bookAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);