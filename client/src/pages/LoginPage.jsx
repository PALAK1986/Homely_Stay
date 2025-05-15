import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailValid(emailRegex.test(email));
    setPasswordValid(passwordRegex.test(password));

    if (!emailRegex.test(email)) {
      setError("Email must be in format abc@gmail.com");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be 8+ characters with letter, number & special character.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const loggedIn = await response.json();
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={!emailValid ? "invalid" : ""}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={!passwordValid ? "invalid" : ""}
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <a href="/forgot-password" className="forgot-password-link">
  Forgot Password?
</a>

        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
