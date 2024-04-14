import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import "./SellCard.css";

function SellCard(props) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(100);
  const [amount, setAmount] = useState(0);

  const handleSlider = (event) => {
    setMaxQuantity(props.quantity);
    setQuantity(event.target.value);
    setAmount(event.target.value * props.currentPrice);
  };

  const handleSell = async () => {
    if (quantity === 0) return;

    const jsonData = {};
    jsonData.stockName = props.name;
    jsonData.stockImageLink = props.image;
    jsonData.stockID = props.id;
    jsonData.quantity = quantity;
    jsonData.price = props.currentPrice;

    const response = await fetch(baseUrl + "/portfolio/sold/" + props.id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    const data = await response.json();
    console.log(data);

    navigate("/history");
  };

  return (
    <div className="sell-card-main-container">
      <div className="sell-card-stock-details">
        <div className="sell-card-header">
          <div className="sell-card-image-container">
            <img src={props.image} alt="" style={{ height: "50px" }} />
          </div>
          <div className="sell-card-symbol-container">
            <h4 style={{ margin: "0", textTransform: "uppercase" }}>
              {props.symbol}
            </h4>
          </div>
          <div className="sell-card-title-container">
            <h4>{props.name}</h4>
          </div>
        </div>
        <div className="sell-card-stats">
          <h4>Your Holding Stats :</h4>
          <h5>
            Avg. Buy price :{" "}
            <span>$ {parseFloat(props.buyPrice).toFixed(4)}</span>
          </h5>
          <h5>
            Market Value : <span>$ {props.currentPrice}</span>
          </h5>
          <h5>
            Quantity : <span>{props.quantity}</span>
          </h5>
        </div>
      </div>

      <div className="sell-card-sub-container">
        <input
          type="range"
          min="1"
          max={maxQuantity}
          value={quantity}
          style={{ width: "100%" }}
          className="sell-card-slider"
          onChange={handleSlider}
        />

        <div className="sell-card-checkout-container">
          <h4>
            Quantity : <span className="sell-card-quantity">{quantity}</span>
          </h4>
          <h4>
            Amount : ${" "}
            <span className="sell-card-amount">{amount.toFixed(4)}</span>
          </h4>
        </div>

        <div className="sell-card-button-group">
          <button type="button" class="btn btn-danger" onClick={handleSell}>
            Sell Now
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
    </div>
  );
}

export default SellCard;
