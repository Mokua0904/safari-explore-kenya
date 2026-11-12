import Tour from "../models/Tour.js";

//Create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    // Fixed: changed success to false and added error details
    res.status(500).json({ success: false, message: "Failed to create", error: error.message });
  }
};

//Update Tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update", error: error.message });
  }
};

//Delete Tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete", error: error.message });
  }
};

//Getsingle Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({ success: true, message: "Successfully", data: tour });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found", error: error.message });
  }
};

//Get All Tour
export const getAllTour = async (req, res) => {
  // Fixed: Added fallback to 0 if no page is provided
  const page = parseInt(req.query.page) || 0; 

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch", error: error.message });
  }
};

// Get tour by search
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance) || 0;
  const maxGroupSize = parseInt(req.query.maxGroupSize) || 0;

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({ success: true, message: "Successfully", data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to search", error: error.message });
  }
};

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({ success: true, message: "Successfully", data: tours });
  } catch (error) {
    // Added error message so we know exactly why it fails
    res.status(500).json({ success: false, message: "Failed to get featured", error: error.message });
  }
};

//Get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch count", error: error.message });
  }
};