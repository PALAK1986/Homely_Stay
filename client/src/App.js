// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import CreateListing from "./pages/CreateListing";
// import ListingDetails from "./pages/ListingDetails";
// import TripList from "./pages/TripList";
// import WishList from "./pages/WishList";
// import PropertyList from "./pages/PropertyList";
// import ReservationList from "./pages/ReservationList";
// import CategoryPage from "./pages/CategoryPage";
// import SearchPage from "./pages/SearchPage";

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/create-listing" element={<CreateListing />} />
//           <Route path="/properties/:listingId" element={<ListingDetails />} />
//           <Route path="/properties/category/:category" element={<CategoryPage />} />
//           <Route path="/properties/search/:search" element={<SearchPage />} />
//           <Route path="/:userId/trips" element={<TripList />} />
//           <Route path="/:userId/wishList" element={<WishList />} />
//           <Route path="/:userId/properties" element={<PropertyList />} />
//           <Route path="/:userId/reservations" element={<ReservationList />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;






import React, { useState } from "react";
import axios from "axios";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import { createRazorpayOrder, handleRazorpayScreen } from "./helpers/razorpay";
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';


// Import the new pages
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";

function App() {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  // Create Razorpay order
  const handlePayment = async (amount) => {
    try {
      const orderData = await createRazorpayOrder(amount);
      handleRazorpayScreen(orderData.amount / 100, async (paymentId) => {
        setResponseId(paymentId);
        const paymentDetails = await axios.get(
          `http://localhost:3001/payment/${paymentId}`
        );
        setResponseState(paymentDetails.data);
      });
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  // Handle booking to trigger Razorpay
  const handleBooking = () => {
    handlePayment(100); // Amount you want to charge
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          {/* <Route path="/properties/search/:search" element={<SearchPage />} /> */}
          <Route path="/search" element={<SearchPage />} />

          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          
          <Route
            path="/payment-success/:paymentId"
            element={<PaymentSuccess />}
          />


          {/* Add the new routes */}
          <Route path="/about" element={<About />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>

         
      </BrowserRouter>
    </div>
  );
}

export default App;
