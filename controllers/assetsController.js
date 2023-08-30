const Asset = require("../models/asset");

// USER
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

// ADMIN

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
  getAvailableAssets,
  getAvailableAsset,
  getAllAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
