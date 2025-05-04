const User = require("../models/User");
const { google } = require('googleapis');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
        user: "ghazysaoudi007@gmail.com",
        pass: "ytpz uszz cjln rpvu",
    },
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
});


async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Email not found");
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; 
    await user.save();

    const resetLink = `http://localhost:5001/reset-password/${token}`; 

    const mailOptions = {
      from: process.env.EMAIL_USER || "ghazysaoudi007@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
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
      user.password = await bcrypt.hash(password, 10);
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
      res.status(200).send("Password updated successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
  




module.exports = { add, getAll, getById, getByName, update, deleteUser, deleteAll,resetPassword,forgotPassword};
