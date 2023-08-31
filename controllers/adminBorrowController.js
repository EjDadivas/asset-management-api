const Asset = require("../models/asset");
const Transaction = require("../models/transaction");

const getAllTransactions = async (req, res) => {
  //   TODO: Add a filter
  try {
    const transactions = await Transaction.find()
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
const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate("userId", "username")
      .populate("assetId");

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    updated = await transaction.updateOne({ ...req.body });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    deleted = await transaction.deleteOne();

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
