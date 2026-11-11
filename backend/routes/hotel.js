import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// GET ALL HOTELS
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch hotels" });
  }
});

// GET SINGLE HOTEL
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, data: hotel });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch hotel" });
  }
});

// CREATE HOTEL
router.post("/", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json({ success: true, data: savedHotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE HOTEL
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedHotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE HOTEL
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;