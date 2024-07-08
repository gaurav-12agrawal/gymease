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
                html: `
                <div  style="display:flex;justify-content:center;align-items:center; margin:auto;" >
                <img  alt="Image" style="width: 50%; height: 50%; margin:auto;  border-radius:100%;" src= 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1690913288/Important%20image/GYMOZY_LOGO_llplc3.png' ></img></div> 
                 <br/><br/><br/>
                <div style="width: 100%; height: 90px; background-color:green;display:flex;
                justify-content:center;align-items:center; margin:auto;" ><p style="color:white; font-size:20px ;margin:auto;" >Password Reset Link</p></div>
                <p>We hope this email finds you in good health and high spirits. It seems like you've forgotten your Gymozy account password. No worries, we are here to assist you in regaining access to your account.
                </p>
                <p>To reset your password, please click on the link provided below. <b>Please note that this link will be valid for the next 2 minutes for security purposes:</b>
                </p>
                <a href="https://gymozy.netlify.app/forgetpassword/${userfind._id}/${setusertoken.verifytoken}" >Password Reset Link</a><br/>
                <p>
                By clicking on the link, you will be directed to a secure page where you can reset your Gymozy account password. If you did not initiate this password reset, kindly ignore this email. Rest assured that your account is safe and secure.<br/><br/>
                
                For security reasons, we recommend that you choose a strong and unique password that you have not used for any other service.<br/><br/>
                
                If you encounter any issues during the password reset process or have any concerns regarding your account, please don't hesitate to contact our support team at support.gymozy@gmail.com . We are here to assist you and ensure a smooth experience.<br/><br/>
                
                Thank you for choosing Gymozy as your fitness partner. We value your trust and strive to provide the best service possible.<br/><br/>
                
                Best regards,<br/><br/>
                
                The Gymozy Team
                </p>

                       
                       
                `
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
