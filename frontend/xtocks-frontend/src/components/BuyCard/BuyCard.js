import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import "./BuyCard.css";

function BuyCard(props) {
  const navigate = useNavigate();

  const [cryptoDetails, setCryptoDetails] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(100);

  const availableBalance = props.userBalance;

  const fetchCryptoDetails = async () => {
    const API = `https://api.coingecko.com/api/v3/coins/${props.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    console.log(API);
    try {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data);
      setCryptoDetails(data);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  useEffect(() => {
    fetchCryptoDetails();
  }, []);

  const handleVariablesUpdate = async () => {
    if (cryptoDetails.market_data) {
      setCurrentPrice(cryptoDetails.market_data.current_price.usd);
    }
  };

  useEffect(() => {
    handleVariablesUpdate();
  }, [cryptoDetails]);

  const handleSlider = (event) => {
    setMaxQuantity(Math.floor(availableBalance / currentPrice));
    setQuantity(event.target.value);
    setAmount(event.target.value * currentPrice);
  };

  const handleBuyNow = async () => {
    if (quantity === 0) return;
    const jsonData = {};
    jsonData.stockName = cryptoDetails.name;
    jsonData.stockImageLink = cryptoDetails.image.large;
    jsonData.stockID = cryptoDetails.id;
    jsonData.quantity = quantity;
    jsonData.price = cryptoDetails.market_data.current_price.usd.toString();

    const response = await fetch(baseUrl + "/portfolio/bought/" + props.id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    navigate("/portfolio");
  };

  return (
    <div className="buy-card-main-container">
      <div className="buy-card-balance-container">
        <h4>
          Available Balance :{" "}
          <span>$ {parseFloat(props.userBalance).toFixed(4)}</span>
        </h4>
      </div>
      {!cryptoDetails.image && !cryptoDetails.market_data ? (
        <></>
      ) : (
        <>
          <div className="buy-card-stock-details">
            <div className="buy-card-header">
              <div className="buy-card-image-container">
                <img
                  src={cryptoDetails.image.large}
                  alt=""
                  style={{ height: "50px" }}
                />
              </div>
              <div className="buy-card-symbol-container">
                <h4 style={{ margin: "0", textTransform: "uppercase" }}>
                  {cryptoDetails.symbol}
                </h4>
              </div>
              <div className="buy-card-title-container">
                <h4>{cryptoDetails.name}</h4>
              </div>
            </div>
            <div className="buy-card-stats">
              <h4>Past 24 Hour Stats</h4>
              <h5>
                Highest Price :{" "}
                <span>$ {cryptoDetails.market_data.high_24h.usd}</span>
              </h5>
              <h5>
                Lowest Price :{" "}
                <span>$ {cryptoDetails.market_data.low_24h.usd}</span>
              </h5>
              <h5>
                Current Price : <span>$ {currentPrice}</span>
              </h5>
            </div>
          </div>

          <div className="buy-card-sub-container">
            <input
              type="range"
              min="1"
              max={maxQuantity}
              value={quantity}
              style={{ width: "100%" }}
              className="buy-card-slider"
              onChange={handleSlider}
            />

            <div className="buy-card-checkout-container">
              <h4>
                Quantity : <span className="buy-card-quantity">{quantity}</span>
              </h4>
              <h4>
                Amount : ${" "}
                <span className="buy-card-amount">{amount.toFixed(4)}</span>
              </h4>
            </div>

            <div className="buy-card-button-group">
              <button
                type="button"
                class="btn btn-success"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={props.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BuyCard;
