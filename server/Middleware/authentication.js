const jwt = require('jsonwebtoken')
const User = require('../models/userschema')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const authenticate = async (req, res, next) => {
    try {
        let token = req.params.token;
        if (token === 'empty') return res.sendStatus(400);
        const checkname = (req.params.token).slice(0, 7);
        token = token.substring(8)
        function decodeString(encodedString) {
            const encodedChars = encodedString.split('-');
            let decodedString = '';

            for (let i = 0; i < encodedChars.length; i++) {
                const encodedChar = encodedChars[i];
                const charCode = parseInt(encodedChar, 16);
                const decodedChar = String.fromCharCode(charCode);
                decodedString += decodedChar;
            }

            return decodedString;
        }
        const decodedString = decodeString(token);
        token = decodedString
        if (checkname !== 'jwtoken') return res.sendStatus(400);

        const verifyToken = jwt.verify(token, process.env.MY_SECRET);
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