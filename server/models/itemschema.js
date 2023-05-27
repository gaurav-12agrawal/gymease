const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    gymid: String,
    amount: Number,
    type: String,
    name: String,
    email: String,
    phone: Number,
    images: [{
        url: String,
        filename: String
    }],
    gymname: String,
    gymaddress: String,
    currentdate: Number,
    joiningdate: Number,
    expiredate: Number,
    isverified: Boolean,
    verifytoken: String,
    isvalid: Number,
    cbyuser: Number
})
const Item = new mongoose.model("items", itemSchema);
module.exports = Item;
