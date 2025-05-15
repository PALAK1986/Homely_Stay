// src/pages/About.js
import "../styles/About.scss"; // Import your SCSS or CSS file for styling

const About = () => {
  return (
    <div className="about-page">
      <div className="about-banner">
      <a href="/">
        <img src="/assets/logo.png" alt="Homely Stay" />
        </a>
      </div>
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Homely Stay</strong>, your perfect vacation rental platform. Whether you're
          looking for beachfront properties, charming cottages, or luxurious stays, we offer a wide range of
          vacation homes to suit your preferences.
        </p>
        <p>
          Our mission is to make booking a stay easy, secure, and enjoyable, helping you create unforgettable
          experiences. Our team is committed to providing you with the highest quality service and the best
          accommodations around the world.
        </p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Wide range of properties</li>
          <li>24/7 customer support</li>
          <li>Easy-to-use platform</li>
          <li>Affordable and flexible options</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
