import React, { useState, useEffect, useRef } from "react";
import "./InvestCard.css";
import BuyCard from "../BuyCard/BuyCard";

function InvestCard(props) {
  const [showBuyCard, setShowBuyCard] = useState(false);
  const buyCardRef = useRef(null);

  const handleBuyNow = () => {
    setShowBuyCard(true);
  };

  const handleCancel = () => {
    setShowBuyCard(false);
  };

  const handleClickOutsideBuyCard = (event) => {
    if (buyCardRef.current && !buyCardRef.current.contains(event.target)) {
      setShowBuyCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBuyCard);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBuyCard);
    }; 
  }, []);

  return (
    <>
      {showBuyCard && (
        <>
          <div className="overlay"></div>
          <div ref={buyCardRef}>
            <BuyCard handleCancel={handleCancel} id={props.id} userBalance={props.userBalance}/>
          </div>
        </>
      )}
      <div className="invest-main-card-container">
        <div className="invest-card-child-container invest-stock-main-details">
          <div className="invest-stock-img">
            <img src={props.image} width="30px" height="30px"></img>
          </div>
          <div className="invest-stock-heading">
            <div className="invest-stock-symbol">
              <h5>{props.symbol}</h5>
            </div>
            <div className="invest-stock-name">
              <span>{props.name}</span>
            </div>
          </div>
        </div>
        <div className="invest-card-child-container invest-highest-price">
          <span>$ {props.high_24h}</span>
        </div>
        <div className="invest-card-child-container invest-lowest-price">
          <span>$ {props.low_24h}</span>
        </div>
        <div className="invest-card-child-container invest-market-price">
          <span>$ {props.current_price}</span>
        </div>
        <div className="invest-card-child-container invest-buy-button">
          <button type="button" class="btn btn-success" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}

export default InvestCard;
