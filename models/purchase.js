// models/Purchase.js
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({

  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  _event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  totalPrice: {
    type: Number,
    default: 0
  },

  quantity: {
    type: Number,
  },

});


const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase