import React, { useEffect, useState, useRef } from "react";
import "./PortfolioCard.css";
import SellCard from "../SellCard/SellCard";

function PortfolioCard(props) {
  const [returnPercent, setReturnPercent] = useState(0);
  const [showSellCard, setShowSellCard] = useState(false);
  const sellCardRef = useRef(null);

  const handleSell = () => {
    setShowSellCard(true);
  };

  const handleCancel = () => {
    setShowSellCard(false);
  };

  const handleClickOutsideSellCard = (event) => {
    if (sellCardRef.current && !sellCardRef.current.contains(event.target)) {
      setShowSellCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSellCard);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSellCard);
    };
  }, []);

  useEffect(() => {
    setReturnPercent(
      (
        (Math.abs(parseFloat(props.current_price) - parseFloat(props.price)) *
          100) /
        parseFloat(props.price)
      ).toFixed(4)
    );
  }, []);

  return (
    <>
      {showSellCard && (
        <>
          <div className="overlay"></div>
          <div ref={sellCardRef}>
            <SellCard
              id={props.id}
              name={props.name}
              image={props.image}
              quantity={props.quantity}
              symbol={props.symbol}
              currentPrice={props.current_price}
              buyPrice={props.price}
              handleCancel={handleCancel}
            />
          </div>
        </>
      )}
      <div className="main-card-container">
        <div className="card-child-container stock-main-details">
          <div className="invest-stock-img">
            <img src={props.image} width="30px" height="30px"></img>
          </div>
          <div className="stock-heading">
            <div className="stock-symbol">
              <h5 style={{ textTransform: "uppercase" }}>{props.symbol}</h5>
            </div>
            <div className="stock-name">
              <span>{props.name}</span>
            </div>
          </div>
        </div>
        <div className="card-child-container current-price">
          <span>$ {parseFloat(props.current_price).toFixed(4)}</span>
        </div>
        <div className="card-child-container buy-price">
          <span>$ {parseFloat(props.price).toFixed(4)}</span>
        </div>
        <div className="card-child-container quantity">
          <span>{props.quantity}</span>
        </div>
        <div className="card-child-container return-percent">
          <span>
            {parseFloat(props.current_price) < parseFloat(props.price) ? (
              <>- </>
            ) : (
              <></>
            )}
            {returnPercent} %
          </span>
        </div>
        <div className="card-child-container sell-button">
          <button type="button" class="btn btn-danger" onClick={handleSell}>
            Sell
          </button>
        </div>
      </div>
    </>
  );
}

export default PortfolioCard;
