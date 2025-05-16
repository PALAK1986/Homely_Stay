const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

// Create Razorpay order
router.post("/orders", async (req, res) => {
  console.log("✅ /payment/orders endpoint hit");

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100, // Convert to paise
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
    console.error("❌ Order creation failed:", error);
    res.status(500).send("Internal server error");
  }
});

// Fetch Razorpay payment details
router.get("/:paymentId", async (req, res) => {
  console.log("✅ /payment/:paymentId endpoint hit");

  const { paymentId } = req.params;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json("Payment not found");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error("❌ Payment fetch failed:", error);
    res.status(500).json("Failed to fetch payment details");
  }
});

module.exports = router;
