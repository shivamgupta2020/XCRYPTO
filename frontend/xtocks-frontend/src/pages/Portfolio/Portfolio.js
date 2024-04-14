import React, { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./Portfolio.css";
import { baseUrl } from "../../baseUrl";

function Portfolio() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [cryptoDetails, setCryptoDetails] = useState({});

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch(baseUrl + "/portfolio/bought", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data.stockDetails);
      setPortfolioData(data.stockDetails);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchCryptoDetails = async (ID) => {
    const API = `https://api.coingecko.com/api/v3/coins/${ID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    try {
      const response = await fetch(API);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      let tempCryptoDetails = {};
      for (let i = 0; i < portfolioData.length; i++) {
        const stock = portfolioData[i];
        const cryptoData = await fetchCryptoDetails(stock.stockID);
        tempCryptoDetails[stock.stockID] = cryptoData;
      }
      setCryptoDetails(tempCryptoDetails);
    };
    fetchCryptoData();
  }, [portfolioData]);

  return (
    <div className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-container-left">
          <SideNavbar />
        </div>
        <div className="portfolio-container-right">
          <DashboardNavbar />
          <div className="portfolio-sub-container-right">
            <div className="portfolio-holdings-container">
              <div className="portfolio-main-title">
                <h3>YOUR PORTFOLIO</h3>
              </div>
              <div className="portfolio-heading">
                <div className="sub-heading stock-details">
                  <span>STOCK NAME</span>
                </div>
                <div className="sub-heading stock-current-price">
                  <span>MARKET VALUE</span>
                </div>
                <div className="sub-heading stock-buy-price">
                  <span>AVG. BUY PRICE</span>
                </div>
                <div className="sub-heading stock-quantity">
                  <span>QUANTITY</span>
                </div>
                <div className="sub-heading stock-return-percent">
                  <span>RETURN PERCENT</span>
                </div>
                <div className="sub-heading stock-trade-activity">
                  <span>TRADE ACTIVITY</span>
                </div>
              </div>
              <div className="portfolio-card-container">
                {portfolioData.map((stock) => {
                  const cryptoData = cryptoDetails[stock.stockID];
                  return cryptoData &&
                    cryptoData.market_data &&
                    cryptoData.image &&
                    cryptoData.symbol ? (
                    <PortfolioCard
                      id={stock.stockID}
                      name={stock.stockName}
                      price={stock.price}
                      quantity={stock.quantity}
                      image={cryptoData.image.large}
                      current_price={cryptoData.market_data.current_price.usd}
                      symbol={cryptoData.symbol}
                    />
                  ) : (
                    <></>
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

export default Portfolio;
