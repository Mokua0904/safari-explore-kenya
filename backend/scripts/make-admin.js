// Usage:  node scripts/make-admin.js you@example.com
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/make-admin.js <email>");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOneAndUpdate({ email }, { role: "admin" }, { new: true });
  if (!user) {
    console.error("No user with that email");
    process.exit(1);
  }
  console.log(` ${user.username} (${user.email}) is now an admin.`);
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}