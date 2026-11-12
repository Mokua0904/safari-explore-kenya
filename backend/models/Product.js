import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    photo: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    vendorId: { type: String, required: true }, // 🆕 Added
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);