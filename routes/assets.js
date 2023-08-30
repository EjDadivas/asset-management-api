const express = require("express");
const {
  getAvailableAssets,
  getAvailableAsset,
  getAllAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetsController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

router.use(authMiddleware);

// Group admin routes
const adminRoutes = express.Router();
adminRoutes.use(isAdminMiddleware);

adminRoutes.get("/", getAllAssets);
adminRoutes.get("/:id", getAsset);
adminRoutes.post("/", createAsset);
adminRoutes.patch("/:id", updateAsset);
adminRoutes.delete("/:id", deleteAsset);

// Group user routes
const userRoutes = express.Router();
userRoutes.get("/", getAvailableAssets);
userRoutes.get("/:id", getAvailableAsset);

// Define paths for admin and user route groups
router.use("/admin", adminRoutes);
router.use("/", userRoutes);

module.exports = router;
