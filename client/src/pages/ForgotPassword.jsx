import React, { useState } from 'react';
import axios from 'axios';
import "../styles/ForgotPassword.scss";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/forgotPassword', { email });
      setMessage('OTP sent to your email');
      navigate('/verify-otp', { state: { otpId: res.data.otpId, email } });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Send OTP</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
