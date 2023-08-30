const Asset = require("../models/asset");

// USER
// TODO: User Assets[all, specific, query params]
const getAvailableAssets = (req, res) => {
  res.status(200).json({ msg: "user: get all assets" });
};
const getAvailableAsset = (req, res) => {
  res.status(200).json({ msg: "user: get single asset" });
};

// ADMIN

const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findById(id);
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createAsset = async (req, res) => {
  try {
    const { name, description, availability } = req.body;

    const asset = new Asset({
      name,
      description,
      availability,
    });
    await asset.save();

    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAvailableAssets,
  getAvailableAsset,
  getAllAssets,
  getAsset,
  createAsset,
};
