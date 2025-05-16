const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const Otp = require("../models/otp");
const {sendOtpEmail }= require("../service/mailService.js")
const { Router } = require("express");
const mongoose = require("mongoose");
/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error("Registration Error: ", err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", { email }); // Log email only, for security

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" }); // Use 404 for not found
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expiration
    delete user.password; // Don't send password back

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

router.post("/forgotPassword" ,async (req, res) => {
  const { email } = req.body;
    console.log("Hitted")
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Save OTP to DB
    const savedOtp = await Otp.create({ email, otp });

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.status(200).json({
      message: 'OTP sent successfully',
      otpId: savedOtp._id, // Send OTP ID to client
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
});

router.post("/verify-otp", async (req, res) => {
   const { otpId, otp, newPassword } = req.body;
   console.log(otpId);
  if (!mongoose.Types.ObjectId.isValid(otpId)) {
    return res.status(400).json({ message: 'Invalid OTP ID' });
  }

  if (!otp || !newPassword) {
    return res.status(400).json({ message: 'OTP and new password are required' });
  }

  try {
    const record = await Otp.findById(otpId);

    if (!record) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: 'Incorrect OTP' });
    }

    // Find the user by email
    const user = await User.findOne({ email: record.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP record
    await Otp.deleteOne({ _id: otpId });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to reset password' });
  }});
  module.exports = router



