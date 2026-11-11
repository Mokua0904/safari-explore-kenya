import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    type: { type: String, default: "Standard" }, // Made optional with default
    city: { type: String, required: true },
    photo: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    vendorId: { type: String, required: true }, // 🆕 Added
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Transport", transportSchema);