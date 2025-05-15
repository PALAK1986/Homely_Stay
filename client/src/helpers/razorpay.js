import axios from "axios";

// Create Razorpay Order
export const createRazorpayOrder = async (amount) => {
  const data = JSON.stringify({
    amount: amount * 100, // Convert to paise
    currency: "INR",
  });

  const config = {
    method: "post",
    url: "http://localhost:3001/orders",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    throw error;
  }
};

// Handle Razorpay Payment Screen
export const handleRazorpayScreen = async (amount, onPaymentSuccess) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  const options = {
    key: "rzp_test_rFnbZ6LmOv4uH6",
    amount: amount * 100,
    currency: "INR",
    name: "Homely-Stay",
    description: "Payment to Homely-Stay",
    handler: function (response) {
      onPaymentSuccess(response.razorpay_payment_id);
    },
    prefill: {
      name: "Homely-Stay",
      email: "gkpalak033@gmail.com",    //shashankacharya0227@gmail.com
    },
    theme: {
      color: "#F4C430",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

// Load Razorpay Script
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
