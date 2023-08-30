const express = require("express");
const {
  getAvailableAssets,
  getAvailableAsset,
  getAllAssets,
  getAsset,
  createAsset,
} = require("../controllers/assetsController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

router.use(authMiddleware);

// ADMIN
router.get("/admin", isAdminMiddleware, getAllAssets);
router.get("/admin/:id", isAdminMiddleware, getAsset);
router.post("/admin", isAdminMiddleware, createAsset);
// router.patch("/admin/:id", isAdminMiddleware, updateAsset);
// router.delete("/admin/:id", isAdminMiddleware,  deleteAsset);

//USER

router.get("/", getAvailableAssets);
router.get("/:id", getAvailableAsset);

module.exports = router;
