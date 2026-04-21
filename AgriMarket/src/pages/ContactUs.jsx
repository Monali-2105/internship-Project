import React, { useState } from "react";
import "../pageStyles/ContactUs.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with backend API call
    console.log("Form Data:", form);
    alert("Message sent successfully!");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
    <Navbar/>
    <PageTitle title="Contact-Us"/>
    <div className="contact-container">
      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you 🌱</p>
      </section>

      {/* Content */}
      <div className="contact-content">
        
        {/* Contact Info */}
        {/* <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: support@agrimarket.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: India</p>
        </div> */}

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Footer */}
      <Footer/>
    </div>

    </>
  );
};

export default ContactUs;