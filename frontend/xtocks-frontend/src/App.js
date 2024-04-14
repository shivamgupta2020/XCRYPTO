import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {} from "antd";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Testimonial from "./pages/Testimonial/Testimonial";
import HomeNavbar from "./components/HomeNavbar/HomeNavbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Portfolio from "./pages/Portfolio/Portfolio";
import Invest from "./pages/Invest/Invest";
import History from "./pages/History/History";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <>
            <HomeNavbar />
            <Home />
          </>
        }
      />
      <Route
        path="/about"
        exact
        element={
          <>
            <HomeNavbar />
            <About />
          </>
        }
      />
      <Route
        path="/services"
        exact
        element={
          <>
            <HomeNavbar />
            <Services />
          </>
        }
      />
      <Route
        path="/testimonial"
        exact
        element={
          <>
            <HomeNavbar />
            <Testimonial />
          </>
        }
      />
      <Route
        path="/signup"
        exact
        element={
          <>
            <HomeNavbar />
            <SignUpPage />
          </>
        }
      />
      <Route
        path="/login"
        exact
        element={
          <>
            <HomeNavbar />
            <LoginPage />
          </>
        }
      />
      <Route
        path="/contact"
        exact
        element={
          <>
            <HomeNavbar />
            <Contact />
          </>
        }
      />
      <Route
        path="/dashboard"
        exact
        element={
          <>
            <Dashboard />
          </>
        }
      />
      <Route
        path="/portfolio"
        exact
        element={
          <>
            <Portfolio />
          </>
        }
      />
      <Route
        path="/invest"
        exact
        element={
          <>
            <Invest />
          </>
        }
      />
      <Route
        path="/history"
        exact
        element={
          <>
            <History />
          </>
        }
      />
    </Routes>
  );
};

export default App;
