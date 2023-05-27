const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Item = require("../models/itemschema")
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    cpassword: String,
    isvarified: Boolean,
    emailtoken: String,
    verifytoken: {
        type: String,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'items'
        }
    ]
})


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
        next();
    }
})


// GENTERATING TOKEN
// we are generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id, "admin": false }, process.env.MY_SECRET)
        return token;
    }
    catch (err) {
        console.log(err)
    }
}
const User = mongoose.model('users', userSchema)
module.exports = User