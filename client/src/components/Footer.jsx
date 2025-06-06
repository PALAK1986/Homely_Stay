// import "../styles/Footer.scss"
// import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="footer_left">
//         <a href="/"><img src="/assets/logo.png" alt="logo" /></a>
//       </div>

//       <div className="footer_center">
//         <h3>Useful Links</h3>
//         <ul>
//           <li>About Us</li>
//           <li>Terms and Conditions</li>
//           <li>Return and Refund Policy</li>
//         </ul>
//       </div>

//       <div className="footer_right">
//         <h3>Contact</h3>
//         <div className="footer_right_info">
//           <LocalPhone />
//           <p>1800 180 000</p>
//         </div>
//         <div className="footer_right_info">
//           <Email />
//           <p>homelystay@support.com</p>
//         </div>
//         <img src="/assets/payment.png" alt="payment" />
//       </div>
//     </div>
//   )
// }

// export default Footer;







import "../styles/Footer.scss";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/">
          <img src="/assets/logo.png" alt="logo" />
        </a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/terms-and-conditions">Terms and Conditions</a>
          </li>
          <li>
            <a href="/return-refund-policy">Return and Refund Policy</a>
          </li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>1800 180 000</p>
        </div>
        <div className="footer_right_info">
          <Email />
          {/* Make the email clickable */}
          <a href="mailto:homelystay@support.com">
            <p>homelystay@support.com</p>
          </a>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
};

export default Footer;
