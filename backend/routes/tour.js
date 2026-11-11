import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";
import { verifyUser } from "../utils/verifyToken.js"; 

const router = express.Router();

// Changed verifyAdmin to verifyUser so vendors can manage their own tours
router.post("/", verifyUser, createTour);
router.put("/:id", verifyUser, updateTour);
router.delete("/:id", verifyUser, deleteTour);

router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

router.get("/:id", getSingleTour);
router.get("/", getAllTour);

export default router;