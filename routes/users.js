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
router.get("/assets", getAvailableAssets);
router.get("/assets/:id", getAvailableAsset);
router.post("/borrow", createTransaction);
router.get("/borrow", getUserTransactions);
router.post("/return", returnAsset);
module.exports = router;
