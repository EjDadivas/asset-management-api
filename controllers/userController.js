const User = require("../models/user");

// get specific user
const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
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

const getUserTransactions = async (req, res) => {
  // TODO: get all transactions of user
  res.status(200).json({ msg: "List of all Borrow Transactions" });
};
module.exports = { getUser, updateUser, getUserTransactions };
