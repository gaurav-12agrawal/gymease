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
        let token2 = req.params.token;

        if (token1 === 'empty') return res.status(400).json({ status: 400 })
        const checkname = (token1).slice(0, 17);
        const checkname2 = (token2).slice(0, 12);

        if (checkname !== 'jwtokensuperadmin' && checkname2 !== 'jwtokenadmin') {
            console.log(checkname, checkname2)
            return res.status(400).json({ status: 400 })
        }



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
        if (checkname === 'jwtokensuperadmin') {
            const verifyToken1 = jwt.verify(token1, process.env.MY_SECRET_SUPER_ADMIN);
            rootAdmin1 = await Superadmin.findOne({ _id: verifyToken1._id });
            if (rootAdmin1 && verifyToken1.admin) {
                return next();
            }
        }


        token2 = token2.substring(13)

        const decodedString2 = decodeString(token2);
        token2 = decodedString2
        if (checkname2 === 'jwtokenadmin') {
            const verifyToken = jwt.verify(token2, process.env.MY_SECRET_ADMIN);
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