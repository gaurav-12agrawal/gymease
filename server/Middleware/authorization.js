const jwt = require('jsonwebtoken')
const Admin = require('../models/adminschema')
const Superadmin = require('../models/superadminschema')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const authorization = async (req, res, next) => {
    try {
        let rootAdmin1, rootAdmin
        let token1 = req.params.token;
        if (token1 === 'empty') return res.sendStatus(400);
        const checkname = (token1).slice(0, 17);
        token1 = token1.substring(18)
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
        const decodedString = decodeString(token1);
        token1 = decodedString
        if (checkname !== 'jwtokensuperadmin') return res.sendStatus(400);

        if (token1) {
            const verifyToken1 = jwt.verify(token1, process.env.MY_SECRET_SUPER_ADMIN);
            rootAdmin1 = await Superadmin.findOne({ _id: verifyToken1._id });
            if (rootAdmin1 && verifyToken1.admin) {
                return next();
            }
        }
        const token = req.cookies.jwtokenadmin;
        if (token) {
            const verifyToken = jwt.verify(token, process.env.MY_SECRET_ADMIN);
            rootAdmin = await Admin.findOne({ _id: verifyToken._id });
            if (rootAdmin && verifyToken.admin) {
                return next();
            }
        }
        res.status(401).json({ status: 401, message: "Not valid" })

    }
    catch (err) {
        res.status(401).json({ status: 401, message: "Not valid" })

        console.log(err)
    }
}
module.exports = authorization