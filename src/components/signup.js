import React, { useState } from "react";
import "./signup.css";
import image from "C:/Users/EDWIN/OneDrive/Desktop/JobAI/application/src/assets/signup.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://ocjw3jyw41.execute-api.us-east-1.amazonaws.com/stage1"; // Replace with actual API URL

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, formData);
      console.log("Succesfull")
      setMessage(response.data.message || "Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Could not signup");
    }
  };

  return (
    <div className="signup-page">
      <div className="main">
        <div className="signup-details">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="phone">Phone no.</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <br />
            <center>
              <a href="login">Already have an account? Login</a>
            </center>
            <center>
              <button
                type="submit"
                className="signup-btn"
                disabled={
                  !formData.username ||
                  !formData.password ||
                  !formData.email ||
                  !formData.phone
                }
              >
                Signup
              </button>
            </center>
          </form>
        </div>
        <img
          src={image}
          alt="logo"
          style={{
            height: 500,
            width: 600,
            position: "absolute",
            left: 720,
            top: 80,
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
