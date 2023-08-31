const User = require("../models/user");
const Asset = require("../models/asset");
const Transaction = require("../models/transaction");

// get specific user
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    // TODO: Hash password or Decided to create it at auth Controller
    const updated = await user.updateOne({
      ...req.body,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAvailableAssets = async (req, res) => {
  try {
    const { name, description } = req.query;

    // Build the filter object to be used in the query
    // Added default filter for availablity
    const filter = { availability: true };

    // Add name and/or description to the filter if provided
    if (name) {
      filter.name = name;
    }
    if (description) {
      filter.description = description;
    }
    const assets = await Asset.find(filter);
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAvailableAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findById(id);

    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    if (!asset.availability) {
      res.status(400).json({ error: "Asset not available" });
    }

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { assetId, dueAt } = req.body;
    const userId = req.user._id;
    const asset = Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    if (!asset.availability) {
      res.status(400).json({ error: "Asset not available" });
    }
    const updatedAsset = await asset.updateOne({ availability: false });
    console.log(updatedAsset);

    const transaction = new Transaction({
      userId,
      assetId,
      dueAt,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const assets = await Transaction.find({ user: userId })
      .populate("user", "username")
      .populate("asset", "name");

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const returnAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    if (transaction.user !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const updatedTransaction = transaction.updateOne({ returnedAt: Date.now });
    //updating asset
    const asset = await Asset.findById(transaction.assetId);

    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    if (!asset.availability) {
      res.status(400).json({ error: "Asset not available" });
    }
    const updatedAsset = await asset.updateOne({ availability: true });
    console.log(updatedAsset);

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAvailableAssets,
  getAvailableAsset,
  createTransaction,
  getUserTransactions,
  returnAsset,
};
