const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoughtSchema = new Schema({
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
      price: {
        type: String,
        default: "0",
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Bought = mongoose.model("Bought", BoughtSchema);

module.exports = Bought;
