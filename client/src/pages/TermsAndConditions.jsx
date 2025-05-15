// src/pages/TermsAndConditions.js
import "../styles/TermsAndConditions.scss"; // Import your SCSS or CSS file for styling

const TermsAndConditions = () => {
  return (
    <div className="terms-page">
      <div className="terms-banner">
      <a href="/">
        <img src="/assets/slide.jpg" alt="Terms and Conditions" />
        </a>
      </div>
      <div className="terms-content">
        <h1>Terms and Conditions</h1>
        <h2>Introduction</h2>
        <p>
          Welcome to Homely Stay! By using our services, you agree to the following terms and conditions. Please read them carefully.
        </p>
        
        <h2>Use of Our Service</h2>
        <p>
          Our platform allows users to list and book properties for vacations. You are responsible for providing accurate information about your property or booking.
        </p>

        <h2>Liability</h2>
        <p>
          Homely Stay is not responsible for any damages or losses that occur as a result of using the platform. We encourage you to read the property details thoroughly before making a reservation.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the country in which Homely Stay operates. Any disputes will be resolved in the appropriate jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
