// Library imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let backendUrl;
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "192.168.2.173"
    ) {
      // When developing
      backendUrl = "http://192.168.2.173:3000/api/smart-diet-tracker/login";
    } else {
      // When in production
      backendUrl =
        "https://main-api-0xrx.onrender.com/api/smart-diet-tracker/login";
    }
    try {
      const response = await axios.post(backendUrl, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error: any) {
      console.log("Registration failed", error);
      alert(error.response.data);
    }
  };

  const redirectToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="background">
        <div className="top-bar" id="login--top-bar">
          <h1>Login</h1>
        </div>
        <div id="login--form-container">
          <form id="login--form" onSubmit={handleSubmit}>
            <div id="login--email-container">
              <label htmlFor="login--email">Email</label>
              <input
                type="email"
                id="login--email"
                name="email"
                onChange={handleFormChange}
                value={formData.email}
                required={true}
              />
            </div>
            <div id="login--password-container">
              <label htmlFor="login--password">Password</label>
              <input
                type="password"
                id="login--password"
                name="password"
                onChange={handleFormChange}
                value={formData.password}
                required={true}
              />
            </div>
            <div id="login--buttons-container">
              <button
                type="button"
                id="login--register-button"
                onClick={redirectToRegisterPage}
              >
                Register
              </button>
              <button type="submit" id="login--login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
