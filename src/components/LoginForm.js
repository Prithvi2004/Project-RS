import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./LoginForm.css";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi"; // For password toggle visibility
import loginImage from "../assets/login.png"; // Correct relative path

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for login process
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  // Password toggle function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the pop-up notification for login success
    setShowPopup(true);
    setLoading(true);

    // Simulate a delay for login process (e.g., server validation)
    setTimeout(() => {
      setLoading(false);

      // Store user details in localStorage (for future use)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: loginData.name,
          role: loginData.role,
        })
      );

      // Redirect based on role
      if (loginData.role === "farmer") {
        navigate("/farmer-dashboard"); // Redirect to Farmer Dashboard
      } else if (loginData.role === "consumer") {
        navigate("/consumer-dashboard"); // Redirect to Consumer Dashboard
      } else {
        alert("Please select a role!"); // If no role is selected
      }

      // Clear the form after successful login
      setLoginData({
        name: "",
        password: "",
        role: "",
      });

      // Hide the pop-up
      setShowPopup(false);
    }, 2000);
  };

  // Clear login popup after 3 seconds (for demo)
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="login-container">
      {/* Pop-up notification */}
      {showPopup && (
        <div className={`popup ${loading ? "loading" : ""}`}>
          Login {loading ? "Processing..." : "Successful!"}
        </div>
      )}

      {/* Left Image Section */}
      <div
        className="login-image"
        style={{ backgroundImage: `url(${loginImage})` }}
      ></div>

      {/* Right Form Section */}
      <div className="login-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group" id="name">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={loginData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
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
            <button type="button" className="link-button">
              Forget Password?
            </button>
          </div>

          <button type="submit" className="login-btn">
            {loading ? "Logging in..." : "Login"}
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
