import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const { paymentId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/payment/${paymentId}`)
      .then((response) => {
        setPaymentDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
  }, [paymentId]);

  return (
    <div>
      <h1>Payment Success</h1>
      {paymentDetails ? (
        <div>
          <p>Payment ID: {paymentDetails.paymentId}</p>
          <p>Status: {paymentDetails.status}</p>
          <p>Amount: {paymentDetails.amount / 100} INR</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
