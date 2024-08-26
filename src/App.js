import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import InfoCards from "./components/InfoCards";
import FeatureSection from "./components/FeatureSection";
import AboutUsSection from "./components/AboutUsSection";
import MottoSection from "./components/MottoSection";
import BlogSection from "./components/BlogSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Global animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SearchBar />
        <InfoCards />
        <FeatureSection />
        <AboutUsSection />
        <MottoSection />
        <BlogSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
