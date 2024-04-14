const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoldSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  stockDetails: [
    {
      stockName: {
        type: String,
        default: "",
      },
      stockImageLink: {
        type: String,
        default: "",
      },
      stockID: {
        type: String,
        default: "",
      },
      stockSymbol: {
        type: String,
        default: "DUMMY",
      },
      buyPrice: {
        type: String,
        default: "0",
      },
      price: {
        type: String,
        default: "0",
      },
      quantity: {
        type: Number,
        default: 0,
      },
      profit: {
        type: String,
        default: "0",
      },
    },
  ],
});

const Sold = mongoose.model("Sold", SoldSchema);

module.exports = Sold;
