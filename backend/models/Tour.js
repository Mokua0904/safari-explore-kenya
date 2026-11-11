import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: Number, default: 0 }, // Made optional with default
    photo: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    maxGroupSize: { type: Number, required: true },
    vendorId: { type: String, required: true }, // 🆕 Added
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);