import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./History.css";
import { baseUrl } from "../../baseUrl";

function History() {
  const [historyData, setHistoryData] = useState([]);

  const fetchHistoryData = async () => {
    const response = await fetch(baseUrl + "/portfolio/sold", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setHistoryData(data.stockDetails);
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  return (
    <div className="history">
      <div className="history-container">
        <div className="history-container-left">
          <SideNavbar />
        </div>
        <div className="history-container-right">
          <DashboardNavbar />
          <div className="history-sub-container-right">
            <div className="history-holdings-container">
              <div className="history-main-title">
                <h3>YOUR PAST TRANSACTIONS</h3>
              </div>
              <div className="history-heading">
                <div className="history-sub-heading history-stock-details">
                  <span>STOCK NAME</span>
                </div>
                <div className="history-sub-heading history-stock-sell-price">
                  <span>AVG. SELL PRICE</span>
                </div>
                <div className="history-sub-heading history-stock-buy-price">
                  <span>AVG. BUY PRICE</span>
                </div>
                <div className="history-sub-heading history-stock-quantity">
                  <span>QUANTITY</span>
                </div>
                <div className="history-sub-heading history-stock-return">
                  <span>RETURN</span>
                </div>
              </div>
              <div className="history-card-container">
                {historyData.map((stock) => {
                  return (
                    <HistoryCard
                      id={stock.stockID}
                      image={stock.stockImageLink}
                      name={stock.stockName}
                      buyPrice={stock.buyPrice}
                      sellPrice={stock.price}
                      quantity={stock.quantity}
                      return={stock.profit}
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

export default History;
