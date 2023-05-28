const jwt = require('jsonwebtoken')
const User = require('../models/userschema')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.MY_SECRET);
        console.log('hello')
        console.log(token, verifyToken._id)
        const rootUser = await User.findOne({ _id: verifyToken._id });
        if (!rootUser) {

            res.sendStatus(400);
            throw new Error('user not found');
        }
        if (!verifyToken.admin) {
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;
            req.email = rootUser.email;
            next();
        }
        if (verifyToken.admin) res.sendStatus(400);
    }
    catch (err) {
        res.sendStatus(400);
    }
}
module.exports = authenticate