import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, required: true },
    desc: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    hasResidentRate: { type: Boolean, default: false },
    amenities: { type: [String], default: [] },
    rating: { type: Number, default: 4.5 },
    featured: { type: Boolean, default: false },
    vendorId: { type: String, required: true }, // MUST BE HERE
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);