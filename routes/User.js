const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const UserController = require("../controller/UserController");
const { isAuthenticated, restrictTo } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");


const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
router.use(express.json());


// User CRUD Routes
router.post("/add", UserController.add);
router.get("/users/getAll", isAuthenticated, restrictTo("admin"), UserController.getAll);
router.get("/users/:id", isAuthenticated, restrictTo("admin", "instructor", "user"), UserController.getById);
router.get("/users/name/:name", isAuthenticated, restrictTo("admin", "instructor"), UserController.getByName);
router.put("/users/:id", isAuthenticated, restrictTo("admin", "instructor"), UserController.update);
router.delete("/users/:id", isAuthenticated, restrictTo("admin"), UserController.deleteUser);
router.delete("/users/deleteAll", isAuthenticated, restrictTo("admin"), UserController.deleteAll);

// User Profile & Progress
router.get("/profile/:id", isAuthenticated, restrictTo("admin", "instructor", "user"), UserController.getUserProfile);
router.put("/profile/:id/progress", isAuthenticated, restrictTo("user"), UserController.updateUserProgress);
router.post("/create-profile", isAuthenticated, restrictTo("admin"), UserController.createUserProfile);

// Rankings
router.get("/rankings", UserController.getRankings);

// Password Management
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);

// Facial Recognition
router.post("/face-login", UserController.faceLogin);
router.post("/register-face", UserController.registerFace);

// Email Verification
router.get("/verify/:userId/:uniqueString", UserController.verifyEmail);
router.get("/verified", UserController.verifiedPage);

// OTP + Authentication
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
router.post("/logout", UserController.logout);
router.post("/refresh-session", isAuthenticated, UserController.refreshSession);

// Social Auth
router.get("/auth/google/callback", UserController.googleLoginCallback);

router.get("/current-user", UserController.getCurrentUser);

router.put("/:id/profile-picture", upload.single("image"), UserController.updateProfileImage);

// Error Handling
router.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

module.exports = router;
