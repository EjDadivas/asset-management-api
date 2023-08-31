const express = require("express");
const {
  getAllAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/adminController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

router.use(authMiddleware);

// Group admin routes
const assetRoutes = express.Router();
assetRoutes.use(isAdminMiddleware);

assetRoutes.get("/", getAllAssets);
assetRoutes.get("/:id", getAsset);
assetRoutes.post("/", createAsset);
assetRoutes.patch("/:id", updateAsset);
assetRoutes.delete("/:id", deleteAsset);

// Group user routes
const borrowRoutes = express.Router();
borrowRoutes.get("/", getAllTransactions);
borrowRoutes.get("/:id", getTransaction);
borrowRoutes.patch("/:id", updateTransaction);
borrowRoutes.delete("/:id", deleteTransaction);

// Define paths for admin and user route groups
router.use("/asset", assetRoutes);
router.use("/borrow", borrowRoutes);

module.exports = router;
