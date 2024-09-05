import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">Logo</div>

      {/* Navigation Menu */}
      <nav className="navigation">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/features" className="nav-link">
          Features
        </Link>
        <Link to="BlogSection.js" className="nav-link">
          Blogs
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </nav>

      {/* Authentication Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="auth-link">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/register" className="auth-link">
          <button className="register-btn">Register</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
