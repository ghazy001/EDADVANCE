const express = require("express");
const axios = require("axios");
const cors = require("cors");
const UserController = require("../controller/UserController");


const router = express.Router();
router.use(cors());
router.use(express.json());


router.post('/add', UserController.add);
router.get('/getAll', UserController.getAll);
router.get('/getUser/:id', UserController.getById);
router.get('/getUserName/:name', UserController.getByName);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.deleteUser);
router.delete('/deleteAll', UserController.deleteAll);




router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword); 



// Facial recognition routes
router.post('/face-login', UserController.faceLogin);
router.post('/register-face', UserController.registerFace); 




// Verification Routes (original)
router.get("/verify/:userId/:uniqueString", UserController.verifyEmail);
router.get("/verified", UserController.verifiedPage);

// New OTP Routes
router.post("/verifyOTP", UserController.verifyOTP);
router.post("/resendOTPVerificationCode", UserController.resendOTPVerificationCode);
router.post("/signin", UserController.signin);



module.exports = router;
