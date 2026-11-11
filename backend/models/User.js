import mongoose from "mongoose";

const vendorApplicationSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    phone: { type: String, required: true },
    offerings: {
      type: [String],
      enum: ["hotels", "safaris", "transport"],
      default: [],
    },
    idNumber: { type: String },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    rejectionReason: { type: String },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    role: { type: String, enum: ["user", "vendor", "admin"], default: "user" },
    vendorStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
    vendorApplication: { type: vendorApplicationSchema, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);