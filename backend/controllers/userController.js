import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ─────────────────────────── EXISTING CRUD ───────────────────────────

export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ──────────────────────── VENDOR APPLICATION ─────────────────────────

// POST /users/vendor-application
export const applyVendor = async (req, res) => {
  try {
    const { businessName, phone, offerings, idNumber } = req.body;

    if (!businessName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Business name and phone are required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.role === "vendor") {
      return res.status(400).json({ success: false, message: "You are already a vendor" });
    }
    if (user.vendorStatus === "pending") {
      return res.status(400).json({ success: false, message: "Application already pending" });
    }

    user.vendorStatus = "pending";
    user.vendorApplication = {
      businessName,
      phone,
      offerings: Array.isArray(offerings) ? offerings : [],
      idNumber,
      submittedAt: new Date(),
    };
    await user.save();

    const safe = user.toObject();
    delete safe.password;
    res.status(200).json({ success: true, data: safe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /users/vendor-application/me
export const getMyVendorApplication = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("role vendorStatus vendorApplication");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /users/admin/pending-vendors
export const getPendingVendors = async (req, res) => {
  try {
    const vendors = await User.find({ vendorStatus: "pending" })
      .select("-password")
      .sort({ "vendorApplication.submittedAt": 1 });
    res.status(200).json({ success: true, count: vendors.length, data: vendors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /users/admin/vendors/:id/approve
export const approveVendor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.vendorStatus !== "pending") {
      return res.status(400).json({ success: false, message: "No pending application" });
    }

    user.role = "vendor";
    user.vendorStatus = "approved";
    if (user.vendorApplication) user.vendorApplication.reviewedAt = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `${user.username} is now a vendor`,
      data: {
        _id: user._id,
        username: user.username,
        role: user.role,
        vendorStatus: user.vendorStatus,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /users/admin/vendors/:id/reject
export const rejectVendor = async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.vendorStatus !== "pending") {
      return res.status(400).json({ success: false, message: "No pending application" });
    }

    user.vendorStatus = "rejected";
    if (user.vendorApplication) {
      user.vendorApplication.reviewedAt = new Date();
      user.vendorApplication.rejectionReason =
        reason || "Application did not meet requirements";
    }
    await user.save();

    res.status(200).json({ success: true, message: "Application rejected", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Legacy: kept for backwards compatibility
export const becomeVendor = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role: "vendor", vendorStatus: "approved" },
      { new: true }
    ).select("-password");
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};