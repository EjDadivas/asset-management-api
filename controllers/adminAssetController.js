const Asset = require("../models/asset");

const getAllAssets = async (req, res) => {
  try {
    const { name, description, availability } = req.query;

    const filter = {};
    if (name) {
      filter.name = name;
    }
    if (description) {
      filter.description = description;
    }
    if (availability) {
      filter.availability = availability;
    }
    const assets = await Asset.find(filter);

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
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

const updateAsset = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findById(id);
  if (!asset) {
    return res.status(404).json({ error: "Asset not found" });
  }

  const updated = await asset.updateOne({ ...req.body });
  res.status(200).json(updated);
};
const deleteAsset = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findById(id);
  if (!asset) {
    return res.status(404).json({ error: "Asset not found" });
  }
  const deleted = await asset.deleteOne();
  //   console.log(deleted);
  res.status(200).json(deleted);
  //   res.status(204).end();
};
module.exports = {
  getAllAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
