import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { baseUrl } from "../../baseUrl";

function LoginPage() {
  const navigate = useNavigate();
  const [submitButtonText, setSubmitButtonText] = useState("Login");

  const handleOnSubmit = (event) => {
    event.preventDefault();

    setSubmitButtonText("Logging in...");

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch(baseUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setSubmitButtonText("Login");
      });
  };

  return (
    <div className="login-container">
      <h1>Login to XStocks</h1>
      <form id="login-form" onSubmit={handleOnSubmit}>
        <div className="form-column">
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            required
          />
        </div>

        <div className="form-column">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            required
          />
        </div>

        <input type="submit" value={submitButtonText} />
      </form>
      <h6>
        Create a new account <Link to="/signup">Sign Up</Link>
      </h6>
    </div>
  );
}

export default LoginPage;
