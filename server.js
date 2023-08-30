require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const assetRoutes = require("./routes/assets");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/assets", assetRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000, // Adjust the socket timeout as needed
    keepAlive: true, // Enable keep-alive
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
