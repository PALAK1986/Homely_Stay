import React, { useState } from 'react';
import axios from 'axios';
import "../styles/VerifyOtp.scss";
import { useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');   
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/verify-otp', {
        otpId: state.otpId,
        otp,
        newPassword,
      });
      setMessage('Password reset successful! You can now log in.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="verify-otp">
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default VerifyOtp;
