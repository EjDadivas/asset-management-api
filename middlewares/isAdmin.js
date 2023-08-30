const isAdminMiddleware = (req, res, next) => {
  try {
    // Check if the user's role is 'admin'
    const userRole = req.user.role; // Assuming user role is available from the authMiddleware
    if (userRole === "admin") {
      // User is an admin, proceed to the next middleware or route handler

      next();
    } else {
      // User is not authorized to access this route
      res.status(403).json({ error: "Access denied. Admin role required." });
    }
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = isAdminMiddleware;
