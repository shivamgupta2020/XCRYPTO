import React, { useEffect, useState } from "react";
import User_logo from "../../imgs/user.png";
import "./DashboardNavbar.css";
import { baseUrl } from "../../baseUrl";

function DashboardNavbar() {
  const [userDetails, setUserDetails] = useState({});

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(baseUrl + "/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="right_header">
      <div
        className="greets"
        style={{
          marginLeft: "30px",
          textAlign: "left",
          marginTop: "15px",
        }}
      >
        <h2>
          Welcome to
          <span style={{ color: "#3bcc94", fontWeight: "900" }}>
            {" "}
            Xtocks
          </span>{" "}
        </h2>
        <h6 style={{ color: "#8b94ad" }}>Good Morning, {userDetails.firstname} {userDetails.lastname}</h6>
      </div>
      <div className="user">
        <div className="user_logo">
          <img src={User_logo} alt="user logo" width="80px" height="80px"></img>
        </div>
        <div className="user_info">
          <div className="user_name">{userDetails.firstname} {userDetails.lastname}</div>
          <div className="user_email">{userDetails.username}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
