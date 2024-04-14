const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Bought = require("../models/Bought");
const Sold = require("../models/Sold");
const User = require("../models/User");

const stockRouter = express.Router();
stockRouter.use(cors.corsWithOptions);
stockRouter.use(bodyParser.json());

stockRouter
  .route("/bought")

  .get(authenticate.verifyUser, (req, res, next) => {
    Bought.findOne({ user: req.user._id })
      .populate("user")
      .then(
        (bought) => {
          if (bought) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(bought);
          } else {
            Bought.create({ user: req.user._id }).then((bought) => {
              Bought.findOne({ user: req.user._id })
                .populate("user")
                .then((bought) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(bought);
                });
            });
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

stockRouter
  .route("/bought/:stockId")

  .post(authenticate.verifyUser, (req, res, next) => {
    User.findOne({ _id: req.user._id }).then((user) => {
      var currentBalance = parseFloat(user.balance);
      var currentSpendings = parseFloat(user.spendings);
      const presentSpendings = parseFloat(req.body.price) * req.body.quantity;
      currentBalance = currentBalance - presentSpendings;
      currentSpendings = currentSpendings + presentSpendings;

      user.balance = currentBalance.toString();
      user.spendings = currentSpendings.toString();

      user.save().then((user) => {
        console.log(user);
      });
    });

    Bought.findOne({ user: req.user._id })
      .then(
        (bought) => {
          if (bought !== null) {
            const isFieldPresent = bought.stockDetails.some(
              (obj) => obj.stockID === req.params.stockId
            );

            if (isFieldPresent) {
              const { user, stockDetails } = bought;
              const updateStockDetails = stockDetails.map((stock) => {
                if (stock.stockID === req.params.stockId) {
                  const oldPrice = parseFloat(stock.price);
                  const oldQuantity = parseInt(stock.quantity);
                  const newQuantity = oldQuantity + parseInt(req.body.quantity);
                  const newPrice =
                    (oldPrice * oldQuantity +
                      parseFloat(req.body.price) * parseInt(req.body.quantity)) /
                    newQuantity;
                  return {
                    ...stock,
                    price: newPrice.toString(),
                    quantity: newQuantity,
                  };
                }
                return stock;
              });

              bought.stockDetails = updateStockDetails;

              bought
                .save()
                .then(
                  (bought) => {
                    Bought.findOne({ user: req.user._id })
                      .populate("user")
                      .then((bought) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(bought);
                      });
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            } else {
              bought.stockDetails = bought.stockDetails.concat([req.body]);
              bought
                .save()
                .then(
                  (bought) => {
                    Bought.findOne({ user: req.user._id })
                      .populate("user")
                      .then((bought) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(bought);
                      });
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            }
          } else {
            Bought.create({ user: req.user._id })
              .then(
                (bought) => {
                  bought.stockDetails = bought.stockDetails.concat([req.body]);

                  bought
                    .save()
                    .then(
                      (bought) => {
                        Bought.findOne({ user: req.user._id })
                          .populate("user")
                          .then((bought) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(bought);
                          });
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err));
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

stockRouter
  .route("/sold")

  .get(authenticate.verifyUser, (req, res, next) => {
    Sold.findOne({ user: req.user._id })
      .populate("user")
      .then(
        (sold) => {
          if (sold) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(sold);
          } else {
            Sold.create({ user: req.user._id }).then((sold) => {
              Sold.findOne({ user: req.user._id })
                .populate("user")
                .then((sold) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(sold);
                });
            });
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

stockRouter
  .route("/sold/:stockId")

  .post(authenticate.verifyUser, (req, res, next) => {
    var currentAvgPrice;
    Bought.findOne({ user: req.user._id }).then((bought) => {
      const { user, stockDetails } = bought;
      const updateStockDetails = stockDetails.map((stock) => {
        if (stock.stockID === req.params.stockId) {
          currentAvgPrice = parseFloat(stock.price);
          const oldQuantity = stock.quantity;
          const newQuantity = oldQuantity - req.body.quantity;
          return { ...stock, quantity: newQuantity };
        }
        return stock;
      });

      bought.stockDetails = updateStockDetails;

      bought.save().then((bought) => {
        Bought.findOne({ user: req.user._id })
          .populate("user")
          .then((bought) => {
            console.log(bought);
          });
      });
    });

    User.findOne({ _id: req.user._id }).then((user) => {
      var currentBalance = parseFloat(user.balance);
      var currentReturn = parseFloat(user.return);
      currentBalance =
        currentBalance + parseFloat(req.body.price) * req.body.quantity;
      currentReturn =
        currentReturn +
        (parseFloat(req.body.price) - currentAvgPrice) * req.body.quantity;

      user.balance = currentBalance.toString();
      user.return = currentReturn.toString();

      user.save().then((user) => {
        console.log(user);
      });
    });

    Sold.findOne({ user: req.user._id })
      .then(
        (sold) => {
          if (sold !== null) {
            const isFieldPresent = sold.stockDetails.some(
              (obj) => obj.stockID === req.params.stockId
            );

            if (isFieldPresent) {
              const { user, stockDetails } = sold;
              const updateStockDetails = stockDetails.map((stock) => {
                if (stock.stockID === req.params.stockId) {
                  const oldBuyPrice = parseFloat(stock.buyPrice);
                  const oldPrice = parseFloat(stock.price);
                  const oldQuantity = stock.quantity;
                  const oldProfit = parseFloat(stock.profit);
                  const newBuyPrice =
                    (oldQuantity * oldBuyPrice +
                      req.body.quantity * currentAvgPrice) /
                    (oldQuantity + req.body.quantity);
                  const currentProfit =
                    (parseFloat(req.body.price) - currentAvgPrice) *
                    req.body.quantity;
                  const newProfit = oldProfit + currentProfit;
                  const newQuantity = oldQuantity + req.body.quantity;
                  const newPrice =
                    (oldPrice * oldQuantity +
                      parseFloat(req.body.price) * req.body.quantity) /
                    newQuantity;
                  return {
                    ...stock,
                    buyPrice: newBuyPrice.toString(),
                    price: newPrice.toString(),
                    quantity: newQuantity,
                    profit: newProfit.toString(),
                  };
                }
                return stock;
              });

              sold.stockDetails = updateStockDetails;

              sold
                .save()
                .then(
                  (sold) => {
                    Sold.findOne({ user: req.user._id })
                      .populate("user")
                      .then((sold) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(sold);
                      });
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            } else {
              const currentProfit =
                (parseFloat(req.body.price) - currentAvgPrice) *
                req.body.quantity;
              req.body.profit = currentProfit.toString();
              req.body.buyPrice = currentAvgPrice.toString();
              sold.stockDetails = sold.stockDetails.concat([req.body]);

              sold
                .save()
                .then(
                  (sold) => {
                    Sold.findOne({ user: req.user._id })
                      .populate("user")
                      .then((sold) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(sold);
                      });
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            }
          } else {
            Sold.create({ user: req.user._id })
              .then(
                (sold) => {
                  const currentProfit =
                    (parseFloat(req.body.price) - currentAvgPrice) *
                    req.body.quantity;
                  req.body.profit = currentProfit.toString();
                  req.body.buyPrice = currentAvgPrice.toString();
                  sold.stockDetails = sold.stockDetails.concat([req.body]);

                  sold
                    .save()
                    .then(
                      (sold) => {
                        Sold.findOne({ user: req.user._id })
                          .populate("user")
                          .then((sold) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(sold);
                          });
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err));
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = stockRouter;
