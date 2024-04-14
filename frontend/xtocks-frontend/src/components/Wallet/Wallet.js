import React, { useEffect, useState } from "react";
import "./wallet.css";
import { baseUrl } from "../../baseUrl";

function Wallet(props) {
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
      console.log(data);
      setUserDetails(data);
      console.log(userDetails);
    } catch (err) {
      console.log("Error : err");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="wallet_main">
      <div className="wallet_heading">
        <h2 style={{ fontWeight: "bolder", marginLeft: "5%" }}>Wallet</h2>
      </div>
      <div className="wallet_container">
        <div className="wallet_amounts">
          <span
            style={{
              fontSize: "xx-large",
              // color: "#3bcc94"
            }}
          >
            {" "}
            Total available balance
          </span>
          <span
            style={{
              fontSize: "large",
              color: "#8b94ad",
            }}
          >
            {" "}
            Total spendings
          </span>
          <span
            style={{
              fontSize: "large",
              color: "#8b94ad",
            }}
          >
            {" "}
            Total return
          </span>
        </div>
        <div className="wallet_amount">
          <span
            style={{
              fontSize: "xx-large",
              fontWeight: "bolder",
              color: "#3bcc94",
            }}
          >
            {" "}
            $ {parseFloat(userDetails.balance).toFixed(4)}
          </span>
          <span
            style={{
              fontSize: "large",
              color: "#8b94ad",
            }}
          >
            {" "}
            $ {parseFloat(userDetails.spendings).toFixed(4)}
          </span>
          <span
            style={{
              fontSize: "large",
              color: "#8b94ad",
            }}
          >
            {" "}
            $ {parseFloat(userDetails.return).toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
