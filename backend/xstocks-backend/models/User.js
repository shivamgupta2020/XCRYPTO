const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  balance: {
    type: String,
    default: "1000000",
    // type: mongoose.Schema.Types.Decimal128,
    // default: 1000000,
  },
  spendings: {
    type: String,
    default: "0",
    // type: mongoose.Schema.Types.Decimal128,
    // default: 1000000,
  },
  return: {
    type: String,
    default: "0",
    // type: mongoose.Schema.Types.Decimal128,
    // default: 1000000,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
