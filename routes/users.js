const express = require("express");
const {
  getUser,
  updateUser,
  getUserTransactions,
} = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);
// get all users by id
router.get("/me", getUser);
router.patch("/me", updateUser);
router.get("/borrow", getUserTransactions);
module.exports = router;
