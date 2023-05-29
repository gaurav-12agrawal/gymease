const express = require('express');
const userrouter = express.Router();
const authenticate = require('../Middleware/authentication')
const User = require('../models/userschema')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
userrouter.use(cookieParser());
const validateuser = require('../Middleware/validateuser')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const Item = require('../models/itemschema')

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


userrouter.post('/register', validateuser, async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    try {
        const userExist = await User.findOne({ email })

        if (userExist)
            res.status(401).json({ status: 401, message: "Invalid credentials" });

        else if (password != cpassword)
            res.status(400).json({ status: 400, message: "Invalid credentials" });
        else {

            const user = new User({
                name, email, phone, password, cpassword,
                isvarified: false
                , emailtoken: crypto.randomBytes(64).toString('hex')
            })
            await user.save()
            // send mail to user
            var mailoptions = {
                from: `verify your Email :<${process.env.MAIL_USERNAME_VERIFY}>`,
                to: user.email,
                subject: 'GymEase - Verify Your Email',
                html: `<h1>${user.name} Thanks for Registration</h1>
                       <h5>Please verify your email to continue...</h5>
                       <a href="https://gym-54v4.onrender.com/user/verifyemail?token=${user.emailtoken} " >verify Here</a>
                `
            }
            //send mail
            transporter.sendMail(mailoptions, function (error, info) {
                if (error) {
                    console.log("Error " + error);
                } else {
                    console.log("Email sent successfully");
                }
            });
            res.status(200).json({ status: 200, message: "Good" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ status: 400, message: "server side error" });

    }


})

userrouter.get('/user/verifyemail', async (req, res) => {
    try {
        const token = req.query.token
        const user = await User.findOne({ emailtoken: token })
        if (user) {
            user.emailtoken = null;
            user.isvarified = true;
            await user.save();
            return res.status(200).send('Success ! Now go to login page');
        }
        if (!user) {
            return res.status(400).send('Link Expired');
        }

    } catch (error) {
        console.log(error)

    }

})


/*****************************************LOGIN ROUTE**************/
userrouter.post('/signin', async (req, res) => {
    res.clearCookie('jwtoken');
    const { email, password } = req.body
    try {

        if (!password || !email)
            return res.status(400).json({ error: "All parameters Required" })
        const userLogin = await User.findOne({ email })
        if (userLogin) {
            const Ismatch = await bcrypt.compare(password, userLogin.password) // userLogin m poora data aata h

            if (Ismatch && !userLogin.isvarified)
                return res.status(400).json({ message: "First verify your account ,we already sent email to you register id" })
            if (Ismatch && userLogin.isvarified) {
                const token = await userLogin.generateAuthToken();
                res.cookie('jwtoken', token, {
                    httpOnly: true,
                    maxAge: 3600000 * 5,
                    secure: true,
                    sameSite: 'none'
                })
                return res.status(200).json({ message: "Login successfully" })

            }
            else {
                return res.status(400).json({ message: "Invalid Credientails" })
            }
        }
        else return res.status(400).json({ message: "Invalid Credientails" })


    }
    catch (err) {
        console.log(err)
    }
})

userrouter.get('/user/islogin', authenticate, (req, res) => {
    res.status(200).json({ message: req.userID });


})
userrouter.get('/logout', authenticate, (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("user logout successfully")
})

userrouter.get('/user/islogin/getdata/mybooking', authenticate, async (req, res) => {
    const id = req.userID;
    console.log(id)
    try {
        const user = await User.findById({ _id: id }).populate('items')

        if (!user) {
            return res.sendStatus(400);
        }
        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.sendStatus(401);
    }
})


module.exports = userrouter;
