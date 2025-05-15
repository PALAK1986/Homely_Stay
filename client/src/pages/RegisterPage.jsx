import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
      formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (!isEmailValid) {
      setError("Email must be in format abc@gmail.com");
      return;
    }

    if (!isPasswordValid) {
      setError("Password must be 8+ characters with letter, number & special character.");
      return;
    }

    if (!passwordMatch) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const register_form = new FormData();
      for (const key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={!emailValid ? "invalid" : ""}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className={!passwordValid ? "invalid" : ""}
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className={!passwordMatch ? "invalid" : ""}
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match!</p>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile preview"
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
