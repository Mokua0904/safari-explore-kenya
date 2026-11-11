import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  applyVendor,
  getMyVendorApplication,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  becomeVendor,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser, verifySelfOrAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// ── Vendor application (any logged-in user)
router.post("/vendor-application", verifyUser, applyVendor);
router.get("/vendor-application/me", verifyUser, getMyVendorApplication);

// ── Admin vendor review
router.get("/admin/pending-vendors", verifyAdmin, getPendingVendors);
router.post("/admin/vendors/:id/approve", verifyAdmin, approveVendor);
router.post("/admin/vendors/:id/reject", verifyAdmin, rejectVendor);

// ── Legacy one-click upgrade
router.post("/become-vendor", verifyUser, becomeVendor);

// ── Existing CRUD (AFTER specific routes)
router.put("/:id", verifySelfOrAdmin, updateUser);
router.delete("/:id", verifySelfOrAdmin, deleteUser);
router.get("/:id", verifySelfOrAdmin, getUser);
router.get("/", verifyAdmin, getAllUsers);

export default router;