import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi"; // For password toggle visibility
import "./Register.css";
import registerImage from "../assets/register.png"; // Correct relative path

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Show the pop-up notification
    setShowPopup(true);

    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Clear the form fields
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      password: "",
    });
  };

  return (
    <div className="register-container">
      {/* Pop-up notification */}
      {showPopup && <div className="popup">Registered Successfully!</div>}

      {/* Left Form Section */}
      <div className="register-form">
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 234 567 8900"
              required
            />
          </div>

          {/* Address Input */}
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main St, City, State, ZIP"
              required
            />
          </div>

          <div className="input-group password-group">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter at least 8+ characters"
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="terms">
            <input type="checkbox" required className="check" />
            <p>
              By signing up, I agree with the{" "}
              <button className="link-button">Terms of Use</button> &
              <button className="link-button">Privacy Policy</button>
            </p>
          </div>

          <button type="submit" className="register-btn">
            Sign up
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="social-btn">
            <FaGoogle />
          </button>
          <button className="social-btn">
            <FaFacebook />
          </button>
          <button className="social-btn">
            <FaApple />
          </button>
        </div>

        <div className="have-account">
          Have an account? <a href="/login">Log in</a>
        </div>
      </div>

      {/* Right Image Section */}
      <div
        className="register-image"
        style={{ backgroundImage: `url(${registerImage})` }}
      ></div>
    </div>
  );
}

export default Register;
