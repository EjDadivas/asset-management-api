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
// Approach 1: is to not make this function and simply uncomment the functions i created inside createTransaction and returnAsset.
// Approaach 2: is to crerate a separate function such as provided below.
// > But this can also be more inituitive if we set the parameters isCreate to options which will take up a string. It will receive the value "create" or "return" and the conditional statements will be based on the options.

//Updating Asset
const updateAsset = async (assetId, isCreate) => {
  const asset = await Asset.findById(assetId);
  if (!asset) {
    return "Asset not found";
  }

  //if the action is for creating, we want to check if the availability is true or false.
  if (isCreate && !asset.availability) {
    return "Asset not available";
  }

  // const updatedAsset = await asset.updateOne({ availability: isReturn });
  //if the action is create, we want to set availablity false. if return then we will tell that it is true.
  asset.availability = isCreate ? false : true;
  await asset.save();

  return "Asset updated";
};

const createTransaction = async (req, res) => {
  try {
    const { assetId, dueAt } = req.body;
    const userId = req.user._id;

    // Checking and Updating Asset

    /*
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    if (!asset.availability) {
      return res.status(400).json({ error: "Asset not available" });
    }
    const updatedAsset = await asset.updateOne({ availability: false });
    console.log(updatedAsset);
    */
    const updateResult = await updateAsset(assetId, true);
    if (updateResult !== "Asset updated") {
      return res.status(400).json({ error: updateResult });
    }
    // Creating new Transaction
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
    const transactions = await Transaction.find({ userId: userId })
      .populate("userId", "username")
      .populate("assetId");

    if (!transactions.length) {
      return res.status(404).json({ error: "No Transactions" });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const returnAsset = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    // Checking Transaction
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    if (transaction.returnedAt) {
      return res.status(404).json({ error: "Transaction already completed" });
    }

    // Updating transation status and return date
    // checks if the date today is later than due date
    const status =
      new Date() > transaction.dueAt ? "returned late" : "returned";
    const updatedTransaction = await transaction.updateOne({
      returnedAt: new Date(),
      status: status,
    });

    //Updating asset availability to true
    /*const asset = await Asset.findById(transaction.assetId);

    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    const updatedAsset = await asset.updateOne({ availability: true });
    console.log(updatedAsset); */

    const updateResult = await updateAsset(transaction.assetId, false);
    if (updateResult !== "Asset updated") {
      return res.status(400).json({ error: updateResult });
    }

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
