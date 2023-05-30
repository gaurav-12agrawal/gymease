const express = require('express');
const adminrouter = express.Router();
const Admin = require('../models/adminschema')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const authorization = require('../Middleware/authorization');
adminrouter.use(cookieParser());


// User login Route
adminrouter.post('/signinadminringrg', async (req, res) => {
    const { email, password, name } = req.body
    try {

        if (!password || !email || !name)
            return res.status(400).json({ error: "All parameters Required" })
        const adminLogin = await Admin.findOne({ email, name })
        if (adminLogin) {
            const Ismatch = await bcrypt.compare(password, adminLogin.password)

            if (Ismatch) {
                let token = await adminLogin.generateAuthTokenAdmin();

                // res.cookie('jwtokenadmin', token, {
                //     expires: new Date(Date.now() + (1 * 3600 * 1000)),
                //     httpOnly: true
                // })
                // console.log(token)
                function encodeString(string) {
                    let encodedString = '';

                    for (let i = 0; i < string.length; i++) {
                        const charCode = string.charCodeAt(i);
                        const encodedChar = charCode.toString(16);
                        encodedString += encodedChar + '-';
                    }

                    // Remove the trailing dash
                    encodedString = encodedString.slice(0, -1);

                    return encodedString;
                }
                const encodedString = encodeString(token);
                token = encodedString

                return res.json({ message: "sign in successfully", token: token });

            }
            else return res.status(404).json({ error: "Invalid Credientails" })
        }
        else return res.status(400).json({ error: "Invalid Credientails" })
    }
    catch (err) {
        console.log(err)
    }
})

// check admin
adminrouter.get('/admin/isadmin/:token', authorization, (req, res) => {

    res.status(200).send("This is admin")

})


// logout for admin

adminrouter.get('/logoutadminringrg/:token', authorization, (req, res) => {

    res.status(200).send("Admin logout successfully")

})

module.exports = adminrouter;
