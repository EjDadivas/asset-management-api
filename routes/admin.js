const express = require("express");
// I separated asset and borrow controllers. Another approach is to create 1 controller for both assets and borrow
const {
  getAllAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/adminAssetController");
const {
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/adminBorrowController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

router.use(authMiddleware);
router.use(isAdminMiddleware);
// Group asset routes
const assetRoutes = express.Router();

assetRoutes.get("/", getAllAssets);
assetRoutes.get("/:id", getAsset);
assetRoutes.post("/", createAsset);
assetRoutes.patch("/:id", updateAsset);
assetRoutes.delete("/:id", deleteAsset);

// Group borrow routes
const borrowRoutes = express.Router();
borrowRoutes.get("/", getAllTransactions);
borrowRoutes.get("/:id", getTransaction);
borrowRoutes.patch("/:id", updateTransaction);
borrowRoutes.delete("/:id", deleteTransaction);

// Define paths for admin and user route groups
router.use("/assets", assetRoutes);
router.use("/borrow", borrowRoutes);

module.exports = router;
