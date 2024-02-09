// Library imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom imoprts

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  });

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleFormChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    const { repeatPassword, ...dataToSend } = formData;
    let backendUrl;
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "192.168.2.173"
    ) {
      // When developing
      backendUrl = "http://192.168.2.173:3000/api/smart-diet-tracker/register";
    } else {
      // When in production
      backendUrl =
        "https://main-api-0xrx.onrender.com/api/smart-diet-tracker/register";
    }
    try {
      const response = await axios.post(backendUrl, dataToSend);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <div className="background">
        <div className="top-bar" id="register--top-bar">
          <h1>Register</h1>
        </div>
        <div id="register--form-container">
          <form id="register--form" onSubmit={handleSubmit}>
            <div id="register--email-container">
              <label htmlFor="register--email">Email</label>
              <input
                type="email"
                id="register--email"
                name="email"
                onChange={handleFormChange}
                value={formData.email}
                required={true}
              />
            </div>
            <div id="register--names-container">
              <div id="register--first-name-container">
                <label htmlFor="register--first-name">First Name</label>
                <input
                  className="register--short-input"
                  type="text"
                  id="register--first-name"
                  name="firstName"
                  onChange={handleFormChange}
                  value={formData.firstName}
                  required={true}
                />
              </div>
              <div id="register--last-name-container">
                <label htmlFor="register--last-name">Last Name</label>
                <input
                  className="register--short-input"
                  type="text"
                  id="register--last-name"
                  name="lastName"
                  onChange={handleFormChange}
                  value={formData.lastName}
                  required={true}
                />
              </div>
            </div>
            <div id="register--password-container">
              <label htmlFor="register--password">Password</label>
              <input
                type="password"
                id="register--password"
                name="password"
                onChange={handleFormChange}
                value={formData.password}
                required={true}
              />
            </div>
            <div id="register--repeat-password-container">
              <label htmlFor="register--repeat-password">Repeat Password</label>
              <input
                type="password"
                id="register--repeat-password"
                name="repeatPassword"
                onChange={handleFormChange}
                value={formData.repeatPassword}
                required={true}
              />
            </div>
            <div id="register--buttons-container">
              <button
                id="register--login-button"
                type="button"
                onClick={redirectToLoginPage}
              >
                Login
              </button>
              <button id="register--register-button" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
