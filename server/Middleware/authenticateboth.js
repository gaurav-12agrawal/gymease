const jwt = require('jsonwebtoken')
const User = require('../models/userschema')
const Admin = require('../models/adminschema')
const Superadmin = require('../models/superadminschema')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const authenticateboth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        let rootAdmin, rootUser, rootSuperadmin
        if (token) {
            const verifyToken = jwt.verify(token, process.env.MY_SECRET);
            rootUser = await User.findOne({ _id: verifyToken._id });

        }
        const token1 = req.cookies.jwtokenadmin;
        if (token1) {
            const verifyToken1 = jwt.verify(token1, process.env.MY_SECRET_ADMIN);
            rootAdmin = await Admin.findOne({ _id: verifyToken1._id });

        }
        const token2 = req.cookies.jwtokensuperadmin;
        if (token2) {
            const verifyToken2 = jwt.verify(token2, process.env.MY_SECRET_SUPER_ADMIN);
            rootSuperadmin = await Superadmin.findOne({ _id: verifyToken2._id });

        }
        if (rootAdmin || rootUser || rootSuperadmin) {
            next();
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400);

    }
}
module.exports = authenticateboth