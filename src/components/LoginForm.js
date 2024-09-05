import React, { useState } from "react";
import "./LoginForm.css";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi"; // For password toggle visibility
import loginImage from "../assets/login.png";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the pop-up notification for login success
    setShowPopup(true);

    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Reset the form fields after login
    setLoginData({
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="login-container">
      {/* Pop-up notification */}
      {showPopup && <div className="popup">Login Successful!</div>}

      {/* Left Image Section */}
      <div
        className="login-image"
        style={{ backgroundImage: `url(${loginImage})` }}
      ></div>

      {/* Right Form Section */}
      <div className="login-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group" id="username">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="example.email@gmail.com"
              required
            />
          </div>

          <div className="input-group password-group" id="password">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={loginData.password}
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

          <div className="input-group">
            <label>Login As?</label>
            <select
              name="role"
              value={loginData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="consumer">Consumer</option>
            </select>
          </div>

          <div className="forgot-password">
            <button className="link-button">Forget Password?</button>
          </div>

          <button type="submit" className="login-btn">
            Login
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

        <div className="new-user">
          New User? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
