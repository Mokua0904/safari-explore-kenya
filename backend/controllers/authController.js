import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password, photo, wantsVendor } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo,
      vendorStatus: wantsVendor ? "pending" : "none",
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET;
    if (!secret) {
      console.error("CRITICAL ERROR: JWT_SECRET_KEY is missing in .env");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const { password: pass, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      secret,
      { expiresIn: "15d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,           // Required for HTTPS (Vercel/Render)
        sameSite: "none",       // Required for Cross-Domain cookies
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        data: rest,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Get current logged-in user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};