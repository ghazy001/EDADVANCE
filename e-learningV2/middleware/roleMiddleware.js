// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (!req.session.userId && !req.user) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
    next();
  };
  
  // Middleware to check user role
  const restrictTo = (...roles) => {
    return async (req, res, next) => {
      try {
        const userId = req.session.userId || req.user?._id;
        if (!userId) {
          return res.status(401).json({ message: "Unauthorized: No user session" });
        }
  
        const User = require("../models/User");
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: `Access denied: Requires ${roles.join(" or ")} role` });
        }
  
        req.user = user; // Attach user to request for downstream use
        next();
      } catch (error) {
        res.status(500).json({ message: "Server error during role check" });
      }
    };
  };
  
  module.exports = { isAuthenticated, restrictTo };
