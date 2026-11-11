import express from "express";
import Transport from "../models/Transport.js";

const router = express.Router();

// GET ALL TRANSPORT
router.get("/", async (req, res) => {
  try {
    const transports = await Transport.find({});
    res.status(200).json({ success: true, count: transports.length, data: transports });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
});

// CREATE TRANSPORT
router.post("/", async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    const savedTransport = await newTransport.save();
    res.status(200).json({ success: true, data: savedTransport });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE TRANSPORT
router.put("/:id", async (req, res) => {
  try {
    const updatedTransport = await Transport.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedTransport });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE TRANSPORT
router.delete("/:id", async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Transport deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;