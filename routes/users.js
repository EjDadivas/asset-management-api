const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getUserTransactions,
} = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);
// get all users by id
router.get("/me", getUserProfile);
router.patch("/me", updateUserProfile);
router.post("/borrow", createTransaction);
router.get("/borrow", getUserTransactions);
router.get("/asset", getAvailableAsset);
router.get("/asset/:id", getAvailableAsset);
router.get("/return/:id", returnAsset);
module.exports = router;
