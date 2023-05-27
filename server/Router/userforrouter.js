const express = require('express');
const userforrouter = express.Router();
const User = require('../models/userschema')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// mail sender detail
let transporter = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME_VERIFY,
        pass: process.env.MAIL_PASSWORD_VERIFY
    },
    tls: {
        rejectedUnauthorized: false
    }
});

// send email Link For reset Password
userforrouter.post("/sendpasswordlink", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(401).json({ status: 400, message: "Enter Your Email" })
    }

    try {
        const userfind = await User.findOne({ email });
        if (!userfind.isvarified) { return res.status(400).json({ status: 400, message: "First verify your account ,we already sent email to you register id" }) }
        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, process.env.MY_SECRET, {
            expiresIn: "120s"
        });
        const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });

        if (setusertoken) {
            const mailOptions = {
                from: process.env.MAIL_USERNAME_VERIFY,
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3000/forgetpassword/${userfind._id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(400).json({ status: 400, message: "Some error on server side ,try after some time" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Reset Link has been sent to your mail id" })
                }
            })

        }

    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid user" })
    }

});

// verify user for forgot password time
userforrouter.get("/forgotpassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, process.env.MY_SECRET);
        if (validuser && verifyToken._id) {
            res.status(201).json({ status: 201, validuser })
        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
});


// change password

userforrouter.post("/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const { password, cpassword } = req.body;
    if (password.length < 8 || password !== cpassword)
        return res.sendStatus(401)
    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, process.env.MY_SECRET);
        validuser.verifytoken = null
        await validuser.save();
        console.log(validuser.verifytoken)
        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);
            const setnewuserpass = await User.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setnewuserpass.save();
            res.status(201).json({ status: 201, setnewuserpass })

        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})


module.exports = userforrouter;
