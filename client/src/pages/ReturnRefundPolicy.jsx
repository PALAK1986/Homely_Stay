// src/pages/ReturnRefundPolicy.js
import "../styles/ReturnRefundPolicy.scss"; // Import your SCSS or CSS file for styling

const ReturnRefundPolicy = () => {
  return (
    <div className="return-policy-page">
      <div className="return-policy-banner">
      <a href="/">
        <img src="/assets/cave_cat.jpg" alt="Return and Refund Policy" />
        </a>
      </div>
      <div className="return-policy-content">
        <h1>Return and Refund Policy</h1>
        <h2>Refund Policy</h2>
        <p>
          If you wish to cancel or modify your booking, you must do so within 48 hours of the reservation. Any cancellations made after this period will be subject to a cancellation fee.
        </p>
        
        <h2>Return Policy</h2>
        <p>
          In the case of a return request, you must contact our support team within 7 days of your booking. We will process returns based on the provided details.
        </p>

        <h2>Exceptions</h2>
        <p>
          Some properties may have different cancellation and return policies. Please refer to the property’s individual terms before making a booking.
        </p>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
