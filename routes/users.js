const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getAvailableAssets,
  getAvailableAsset,
  createTransaction,
  getUserTransactions,
  returnAsset,
} = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.get("/me", getUserProfile);
router.patch("/me", updateUserProfile);
router.get("/asset", getAvailableAssets);
router.get("/asset/:id", getAvailableAsset);
router.post("/borrow", createTransaction);
router.get("/borrow", getUserTransactions);
router.patch("/return/:id", returnAsset);
module.exports = router;
