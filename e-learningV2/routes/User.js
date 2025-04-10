const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const UserController = require("../controller/UserController");

const router = express.Router();

// Middleware
router.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
router.use(express.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// --------------------
// User CRUD Routes
// --------------------
router.post("/add", UserController.add);
router.get("/users/getAll", UserController.getAll);
router.get("/users/:id", authenticateToken, UserController.getById);
router.get("/users/name/:name", UserController.getByName);
router.put("/users/:id", authenticateToken, UserController.update);
router.delete("/users/:id", authenticateToken, UserController.deleteUser);
router.delete("/users/deleteAll", authenticateToken, UserController.deleteAll);

// --------------------
// User Profile & Progress
// --------------------
router.get("/profile/:id", authenticateToken, UserController.getUserProfile);
router.put("/profile/:id/progress", authenticateToken, UserController.updateUserProgress);
router.post("/create-profile", UserController.createUserProfile);

// --------------------
// Rankings
// --------------------
router.get("/rankings", UserController.getRankings);

// --------------------
// Password Management
// --------------------
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

// --------------------
// Facial Recognition
// --------------------
router.post("/face-login", UserController.faceLogin);
router.post("/register-face", UserController.registerFace);

// --------------------
// Email Verification
// --------------------
router.get("/verify/:userId/:uniqueString", UserController.verifyEmail);
router.get("/verified", UserController.verifiedPage);

// --------------------
// OTP + Authentication
// --------------------
router.post(
  "/signin",
  [body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 })],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  UserController.signin
);
router.post("/verifyOTP", UserController.verifyOTP);
router.post("/resendOTPVerificationCode", UserController.resendOTPVerificationCode);

// --------------------
// Social Auth
// --------------------
router.get("/auth/google/callback", UserController.googleLoginCallback);

// --------------------
// Error Handling
// --------------------
router.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

module.exports = router;
