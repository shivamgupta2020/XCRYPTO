import React, { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import InvestCard from "../../components/InvestCard/InvestCard";
import Wallet from "../../components/Wallet/Wallet";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./Invest.css";
import { baseUrl } from "../../baseUrl";

function Invest() {
  const [trickers, setTrickers] = useState([]);
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

  const getData = async () => {
    const API =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false";
    try {
      const resp = await fetch(API);
      const data = await resp.json();
      setTrickers(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    getData();
  }, []);

  return (
    <div className="invest">
      <div className="invest-container">
        <div className="invest-container-left">
          <SideNavbar />
        </div>
        <div className="invest-container-right">
          <DashboardNavbar />
          <div className="invest-container-right-body">
            <Wallet />
          </div>
          <div className="invest-sub-container-right">
            <div className="invest-holdings-container">
              <div className="invest-main-title">
                <h3>INVESTMENTS MADE EASY</h3>
              </div>
              <div className="invest-heading">
                <div className="invest-sub-heading invest-stock-details">
                  <span>STOCK NAME</span>
                </div>
                <div className="invest-sub-heading invest-stock-highest-price">
                  <span>HIGHEST PRICE</span>
                </div>
                <div className="invest-sub-heading invest-stock-lowest-price">
                  <span>LOWEST PRICE</span>
                </div>
                <div className="invest-sub-heading invest-stock-market-price">
                  <span>MARKET PRICE</span>
                </div>
                <div className="invest-sub-heading invest-stock-trade-activity">
                  <span>TRADE ACTIVITY</span>
                </div>
              </div>
              <div className="invest-card-container">
                {trickers.map((crypt) => {
                  return (
                    <InvestCard
                      id={crypt.id}
                      name={crypt.name}
                      symbol={crypt.symbol}
                      image={crypt.image}
                      low_24h={crypt.low_24h}
                      high_24h={crypt.high_24h}
                      current_price={crypt.current_price}
                      userBalance={userDetails.balance}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invest;
