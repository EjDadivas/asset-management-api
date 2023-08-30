const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  // Check if there is an authorization token
  const { authorization } = req.headers;

  //Getting the token
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  try {
    // Verifying the token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Get user
    req.user = await User.findOne({ _id: userId });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = authMiddleware;
