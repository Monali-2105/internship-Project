import React from "react";
import "../pageStyles/AboutUs.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
    <Navbar/>
    <PageTitle title="About-Us"/>
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About AgriMarket</h1>
        <p>
          Connecting farmers directly with consumers for a better, fair, and
          sustainable future 🌾
        </p>
      </section>

      <section className="about-section">
  <h2>🌍 Our Purpose</h2>

  <div className="mission-vision-container">
    {/* Mission Box */}
    <div className="mv-box">
      <h3>🎯 Our Mission</h3>
      <p>
        Our mission is to empower farmers by providing them a direct platform
        to sell their products without middlemen, ensuring fair prices and
        fresh produce for consumers.
      </p>
    </div>

    {/* Vision Box */}
    <div className="mv-box">
      <h3>🚀 Our Vision</h3>
      <p>
        To revolutionize the agricultural market by making it transparent,
        efficient, and accessible to every farmer and customer across the
        country.
      </p>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="about-section">
        <h2> What We Offer</h2>
        <div className="features">
          <div className="feature-card">
            <h3>🌾 Fresh Products</h3>
            <p>Directly sourced from farmers to ensure quality and freshness.</p>
          </div>

          <div className="feature-card">
            <h3>💰 Fair Pricing</h3>
            <p>Eliminating middlemen to give farmers better profits.</p>
          </div>

          <div className="feature-card">
            <h3>📦 Easy Delivery</h3>
            <p>Quick and reliable delivery at your doorstep.</p>
          </div>

          <div className="feature-card">
            <h3>📱 Digital Platform</h3>
            <p>Simple and user-friendly interface for everyone.</p>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <Footer/>
    </div>
    </>
  );
};

export default About;