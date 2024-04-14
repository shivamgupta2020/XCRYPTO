import React from "react";
import "./HistoryCard.css";

function HistoryCard(props) {
  return (
    <div className="history-main-card-container">
      <div className="history-card-child-container history-stock-main-details">
        <div className="history-stock-img">
          <img src={props.image} width="30px" height="30px"></img>
        </div>
        <div className="history-stock-heading">
          <div className="history-stock-symbol">
            <h5>AAGA</h5>
          </div>
          <div className="history-stock-name">
            <span>{props.name}</span>
          </div>
        </div>
      </div>
      <div className="history-card-child-container history-sell-price">
        <span>$ {parseFloat(props.sellPrice).toFixed(4)}</span>
      </div>
      <div className="history-card-child-container history-buy-price">
        <span>$ {parseFloat(props.buyPrice).toFixed(4)}</span>
      </div>
      <div className="history-card-child-container history-quantity">
        <span>{props.quantity}</span>
      </div>
      <div className="history-card-child-container history-return">
        <span>{parseFloat(props.return).toFixed(4)}</span>
      </div>
    </div>
  );
}

export default HistoryCard;
