import React from "react";
import "./AboutUsSection.css";
import aboutusimage from "../assets/about-us.jpg";

function AboutUsSection() {
  return (
    <div className="about-us-section">
      <div className="about-us-content">
        <h1 className="fade-in">About us</h1>
        <p className="fade-in delay-1">
          Welcome to RythuSetu, where we bridge the gap between farmers and
          consumers, delivering fresh produce while empowering local
          agriculture.
        </p>

        <h2 className="fade-in delay-2">Our Vision</h2>
        <p className="fade-in delay-3">
          At RythuSetu, we connect farmers and consumers, using smart tools to
          deliver fresh produce directly to every table.
        </p>

        <h2 className="fade-in delay-4">Our Technology</h2>
        <p className="fade-in delay-5">
          RythuSetu leverages React for a seamless user interface, integrates
          APIs to power key features, and incorporates machine learning to
          enhance farming efficiency and connect farmers directly with
          consumers.
        </p>
      </div>

      <div className="about-us-image">
        <img
          src={aboutusimage}
          alt="About Us Illustration"
          className="slide-in-right"
        />
      </div>
    </div>
  );
}

export default AboutUsSection;
