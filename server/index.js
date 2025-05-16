const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Razorpay = require("razorpay");
/* ROUTES */
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");
const paymentRoutes = require("./routes/razorpay.js"); // ✅ Added Razorpay route

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* API ENDPOINTS */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/payment", paymentRoutes); // ✅ Register payment route

/* MONGOOSE SETUP */
const PORT = 3001;
app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).send("Internal server error");
  }
});

// Razorpay Payment Fetch
app.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(500).json("Error fetching payment");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error("Payment fetch failed:", error);
    res.status(500).json("Failed to fetch payment details");
  }
});
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
  })
  .then(() => {
    console.log("Mongo Db Connected SucessFully ");
  })
  .catch((err) => console.log(`${err} did not connect`));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));