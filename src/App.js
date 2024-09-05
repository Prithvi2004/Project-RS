import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import InfoCards from "./components/InfoCards";
import FeatureSection from "./components/FeatureSection";
import AboutUsSection from "./components/AboutUsSection";
import MottoSection from "./components/MottoSection";
import BlogSection from "./components/BlogSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm"; // The login form component
import Register from "./components/Register"; // The register form component
import FarmerDashboard from "./components/FarmerDashboard"; // Farmer interface
import ConsumerDashboard from "./components/ConsumerDashboard"; // Consumer interface
import "./App.css";

function App() {
  // Initialize AOS (Animate on Scroll)
  useEffect(() => {
    AOS.init({
      duration: 1200, // Global animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="nav-bar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </nav>

        {/* Routes for different pages */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="main-content">
                  {/* Sections with AOS animations */}
                  <section data-aos="fade-up">
                    <SearchBar />
                  </section>

                  <section data-aos="fade-up" data-aos-delay="200">
                    <InfoCards />
                  </section>

                  <section data-aos="fade-up" data-aos-delay="400">
                    <FeatureSection />
                  </section>

                  <section data-aos="fade-up" data-aos-delay="600">
                    <AboutUsSection />
                  </section>

                  <section data-aos="fade-up" data-aos-delay="800">
                    <MottoSection />
                  </section>

                  <section data-aos="fade-up" data-aos-delay="1000">
                    <BlogSection />
                  </section>

                  <section data-aos="fade-up" data-aos-delay="1200">
                    <TeamSection />
                  </section>
                </main>

                {/* Footer */}
                <Footer />
              </>
            }
          />

          {/* Login Route */}
          <Route path="/login" element={<LoginWithRedirect />} />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Farmer and Consumer Dashboards */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Component to handle login and redirect based on role
function LoginWithRedirect() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "farmer") {
      navigate("/farmer-dashboard"); // Redirect to Farmer Dashboard
    } else if (role === "consumer") {
      navigate("/consumer-dashboard"); // Redirect to Consumer Dashboard
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}
