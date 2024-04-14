import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import { baseUrl } from "../../baseUrl";

function SignUpPage() {
  const navigate = useNavigate();
  const [submitText, setSubmitText] = useState("Sign Up");

  const handleOnSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior

    setSubmitText("Signing you up...");

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch(baseUrl + "/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitText("Sign Up");
      });
  };

  return (
    <div className="signup-container">
      <h1>SignUp to XStocks</h1>
      <form id="signup-form" onSubmit={handleOnSubmit}>
        <div className="form-column">
          <label htmlFor="firstname">First Name :</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Your first name"
            required
          />
        </div>

        <div className="form-column">
          <label htmlFor="lastname">Last Name :</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Your last name"
            required
          />
        </div>

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

        <input type="submit" value={submitText} />
      </form>
      <h6>
        Already have an account? <Link to="/login">Login to your account</Link>
      </h6>
    </div>
  );
}

export default SignUpPage;
