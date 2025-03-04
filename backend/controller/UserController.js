require('dotenv').config();
const User = require("../models/User");
const UserVerification = require("../models/UserVerification");
const UserOTPVerification = require("../models/UserOTPVerification"); 
const { google } = require('googleapis');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { euclidean } = require('ml-distance');
const { v4: uuidv4 } = require("uuid");
const path = require('path');
const axios = require("axios");



/*

async function add(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

*/

//add tebda 
async function add(req, res) {
  let { name, email, password, recaptchaToken } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  // Valider le token reCAPTCHA
  try {
      const recaptchaResponse = await axios.post(
          "https://www.google.com/recaptcha/api/siteverify",
          null,
          {
              params: {
                  secret: process.env.RECAPTCHA_SECRET_KEY, // Remplace par ton Secret Key dans .env
                  response: recaptchaToken,
              },
          }
      );

      const { success, score } = recaptchaResponse.data;
      if (!success || score < 0.5) { // Ajuste le seuil selon tes besoins
          return res.json({
              status: "FAILED",
              message: "Vérification reCAPTCHA échouée",
          });
      }
  } catch (error) {
      console.error("Erreur reCAPTCHA:", error);
      return res.json({
          status: "FAILED",
          message: "Erreur lors de la vérification reCAPTCHA",
      });
  }

  // Continuer avec la logique existante
  User.findOne({ email })
      .then((existingUser) => {
          if (existingUser) {
              return res.json({ status: "FAILED", message: "Email already exists" });
          }

          bcrypt
              .hash(password, 10)
              .then((hashedPassword) => {
                  const newUser = new User({
                      name,
                      email,
                      password: hashedPassword,
                      creationDate: new Date(),
                      verified: false,
                  });

                  newUser
                      .save()
                      .then((result) => {
                          sendVerificationEmail(result, res);
                      })
                      .catch((err) => {
                          console.error("Error saving user:", err);
                          res.json({
                              status: "FAILED",
                              message: "Error saving user account!",
                          });
                      });
              })
              .catch((err) => {
                  console.error("Error hashing password:", err);
                  res.json({ status: "FAILED", message: "Error hashing password!" });
              });
      })
      .catch((err) => {
          console.error("Error finding user:", err);
          res.json({ status: "FAILED", message: "Error checking user existence!" });
      });
}


async function getAll(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getByName(req, res) {
    try {
        const user = await User.findOne({ name: req.params.name });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAll(req, res) {
    try {
        const result = await User.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} users deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}




  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
});



transporter.verify((error, success) => {
  if (error) console.log(error);
  else console.log("Ready to send emails");
});


async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Email not found");
    }

    // Generate reset token (valid for 1 hour)
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    // Update the link to point to your React app
    // const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`; // Adjust the URL/port as needed

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`; // Adjust the URL/port as needed

    const mailOptions = {
      from: process.env.EMAIL_USER || "ghazysaoudi007@gmail.com",
      to: email,
      subject: "🔐 Reset Your Password",
      html: passwordResetTemplate(resetLink),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error sending email");
      }
      res.status(200).send("Check your email for reset instructions");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}





  // Reset Password: update the user's password
  async function resetPassword(req, res) {
    const { token, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }
    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(404).send("Invalid or expired token");
      }
      // Hash the new password and update user
      user.password = await bcrypt.hash(password, 10);
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
      res.status(200).send("Password updated successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }




async function faceLogin(req, res) {
  const { facialId } = req.body;

  if (!facialId || typeof facialId !== "string") {
    return res.status(400).json({ message: "Valid Facial ID is required" });
  }

  try {
    const user = await User.findOne({ facialId });
    if (!user) {
      return res.status(404).json({ message: "No user found with this facial ID" });
    }

    req.session.userId = user._id;
    return res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Face login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
}

async function registerFace(req, res) {
  const { facialId, name, email } = req.body;

  if (!facialId || !name || !email) {
    return res.status(400).json({ message: "Facial ID, name, and email are required" });
  }

  try {
    const existingUserByFace = await User.findOne({ facialId });
    if (existingUserByFace) {
      return res.status(409).json({ message: "This facial ID is already registered" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "This email is already registered" });
    }

    const user = new User({ name, email, facialId, role: "user" });
    await user.save();

    req.session.userId = user._id;
    return res.json({ message: "Registration successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Face registration error:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
}





// ✅ Envoyer email de vérification (original) by bassem 
const sendVerificationEmail = ({ _id, email }, res) => {
  const uniqueString = uuidv4() + _id;
  const currentUrl = process.env.FRONTEND_URL;


  const verificationUrl = `${currentUrl}/courses`; 

  

   // href="${currentUrl}/courses/${_id}/${uniqueString}"
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",
    html: emailVerificationTemplate(verificationUrl),
  };

  bcrypt
    .hash(uniqueString, 10)
    .then((hashedUniqueString) => {
      new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000, // 6 hours
      })
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() =>
              res.json({ status: "PENDING", message: "Verification email sent" })
            )
            .catch((err) =>
              res.json({ status: "FAILED", message: "Email send failed" })
            );
        });
    });
};


// ✅ Envoyer OTP email de vérification (nouveau)
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: otpVerificationTemplate(otp),
    };

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newUserOTPVerification = new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    await newUserOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "OTP verification email sent successfully",
      data: { userId: _id, email },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};


// ✅ Vérifier OTP
const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    }

    const UserOTPVerificationRecords = await UserOTPVerification.find({ userId });
    if (UserOTPVerificationRecords.length <= 0) {
      throw new Error(
        "Account record doesn't exist or has been verified already. Please sign up or log in."
      );
    }

    const { expiresAt } = UserOTPVerificationRecords[0];
    const hashedOTP = UserOTPVerificationRecords[0].otp;

    if (expiresAt < Date.now()) {
      await UserOTPVerification.deleteMany({ userId });
      throw new Error("Code has expired. Please request again.");
    }

    const validOTP = await bcrypt.compare(otp, hashedOTP);
    if (!validOTP) {
      throw new Error("Invalid code passed. Check your inbox.");
    }

    await User.updateOne({ _id: userId }, { verified: true });
    await UserOTPVerification.deleteMany({ userId });
    res.json({
      status: "VERIFIED",
      message: "Your account has been verified successfully.",
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// ✅ Renvoyer OTP
const resendOTPVerificationCode = async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      throw Error("Empty user details are not allowed");
    }

    await UserOTPVerification.deleteMany({ userId });
    sendOTPVerificationEmail({ _id: userId, email }, res);
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};
  


// ✅ Signin
const signin = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (!email || !password) {
    return res.json({ status: "FAILED", message: "Empty credentials supplied!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "FAILED", message: "Invalid credentials entered!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ status: "FAILED", message: "Invalid password entered!" });
    }

    await sendOTPVerificationEmail(user, res);
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
};



// ✅ Vérifier l'email (original)
const verifyEmail = (req, res) => {
  const { userId, uniqueString } = req.params;

  UserVerification.findOne({ userId }).then((result) => {
    if (!result)
      return res.redirect(`${process.env.FRONTEND_URL}/team`); // res.redirect(`/user/verified?error=true&message=Invalid link`);

    bcrypt.compare(uniqueString, result.uniqueString).then((match) => {
      if (!match)
        return res.redirect(`${process.env.FRONTEND_URL}/team`);/*res.redirect(
          `/user/verified?error=true&message=Invalid verification`
        );*/ 

      User.updateOne({ _id: userId }, { verified: true }).then(() => {
        UserVerification.deleteOne({ userId }).then(() => {
          //res.sendFile(path.join(__dirname, "../views/verified.html"));
          res.redirect(`${process.env.FRONTEND_URL}/team`);
        });
      });
    });
  });
};


// ✅ Page vérifiée
const verifiedPage = (req, res) => {
  //res.sendFile(path.join(__dirname, "../views/verified.html"));
  res.redirect(`${process.env.FRONTEND_URL}/team`);
};


 
// HTML 

const emailVerificationTemplate = (verificationUrl) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #007bff;">✅ Email Verification</h2>
    <p>Hello,</p>
    <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${verificationUrl}" 
         style="background-color: #007bff; color: #fff; padding: 12px 20px; 
                text-decoration: none; border-radius: 5px; font-weight: bold;">
        Verify Email
      </a>
    </div>
    <p>If you did not create this account, you can ignore this email.</p>
    <p>Best regards,</p>
    <p><strong>The Support Team</strong></p>
  </div>
`;


const passwordResetTemplate = (resetLink) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #d32f2f;">🔒 Password Reset Request</h2>
    <p>Hello,</p>
    <p>You recently requested to reset your password. Click the button below to proceed:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" 
         style="background-color: #d32f2f; color: #fff; padding: 12px 20px; 
                text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reset Password
      </a>
    </div>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Best regards,</p>
    <p><strong>The Support Team</strong></p>
  </div>
`;

const otpVerificationTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #007bff;">🔢 Email Verification Code</h2>
    <p>Hello,</p>
    <p>Enter the code below in the app to verify your email address and complete the sign-in process:</p>
    <div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; border: 2px dashed #007bff; display: inline-block;">
      ${otp}
    </div>
    <p>This code <b>expires in 1 hour</b>.</p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best regards,</p>
    <p><strong>The Support Team</strong></p>
  </div>
`;
// HTML 

// ip detector 

async function getCountryFromIP(req, res) {
  try {

    const apiKey = process.env.IPIFY_API_KEY;
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`; 

    const response = await axios.get(url);
    const data = response.data;

    const ipAddress = data.ip; 
    const countryName = data.location.country;

    res.status(200).json({
      ip: ipAddress,
      country: countryName,
      message: `${countryName} : هاذم أفضل دروس لطالب تونسي`
    });


  } catch (error) {
    console.error('Error fetching IP location:', error.message);
    res.status(500).json({
      message: 'Error detecting your location',
      error: error.response ? error.response.data : error.message
    });
  }
}


  


module.exports = { add, getAll, getById, getByName, update, deleteUser, deleteAll,resetPassword,forgotPassword,faceLogin,registerFace,
  verifyEmail,
  verifiedPage,
  sendOTPVerificationEmail, 
  verifyOTP,                
  resendOTPVerificationCode,
  signin,
  getCountryFromIP
};
