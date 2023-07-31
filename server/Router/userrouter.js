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
                subject: 'Gymozy - Verify Your Email',
                html: `
                <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
                }
                 .conntainer{
                    width:100%;
                    padding : 20px;
                 }
                 .logo-cont{
                    display:flex;
                    justify-content:center:
                    align-items:center;
                 }
                 .logo{
                    border-radius:100%;
                    width:80%;
                    height:80%;
                 }
                 .banner{
                    background-color:green;
                    display:flex;
                    justify-content:center:
                    align-items:center;
                 }
              </style>
         
            <body>
              <div class="container">
                <div class="logo-cont">
                 <img class="logo"  alt="Image"  src= 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128198/Important%20image/logo_zzpwsu.jpg' ></img>  
                </div>
                <div class="banner">
                <p>Gymozy Verification Link</p>
                </div>
                <h1>Dear ${user.name},</h1>
                <p>Thank you for choosing Gymozy as your fitness partner. We are thrilled to have you on board! To ensure the security of your account and provide you with a seamless experience, we kindly request you to verify your account.<br/>

               To proceed with the verification process, please click on the link provided below:</p>
               <button>
              <a href="https://gym-54v4.onrender.com/user/verifyemail?token=${user.emailtoken} " >verify Here</a></button>

              <p>
                     By clicking on the link, you will be directed to a secure page where you can verify your account with Gymozy. This step is essential to activate your account and gain access to all the exclusive features and services we offer.<br/>

                If you did not sign up for a Gymozy account, please ignore this email. Rest assured that your information is safe and secure.<br/>

                   If you encounter any issues during the verification process or have any questions regarding your account, feel free to reach out to our support team at support.gymozy@gmail.com . We are always here to assist you.<br/>

                 Thank you for choosing Gymozy as your fitness companion. We are excited to embark on this health and wellness journey together. Let's get started!<br/>

                  Best regards,<br/>

                The Gymozy Team</p>
              </div>
            </body>      
                `
                // html: `
                // <img  alt="Image" style="width: 100%; height: 100%;" src= 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128198/Important%20image/logo_zzpwsu.jpg' ></img>  
                // <div style="width: 100%; height: 100%; background-color:green;" ><p>Gymozy Verification Link</p></div>

                // <h1>Dear ${user.name},</h1>
                //        <p>Thank you for choosing Gymozy as your fitness partner. We are thrilled to have you on board! To ensure the security of your account and provide you with a seamless experience, we kindly request you to verify your account.

                //        To proceed with the verification process, please click on the link provided below:</p>

                //        <button>
                //        <a href="https://gym-54v4.onrender.com/user/verifyemail?token=${user.emailtoken} " >verify Here</a></button>
                //        <p>
                //        By clicking on the link, you will be directed to a secure page where you can verify your account with Gymozy. This step is essential to activate your account and gain access to all the exclusive features and services we offer.

                //        If you did not sign up for a Gymozy account, please ignore this email. Rest assured that your information is safe and secure.

                //        If you encounter any issues during the verification process or have any questions regarding your account, feel free to reach out to our support team at support.gymozy@gmail.com . We are always here to assist you.

                //        Thank you for choosing Gymozy as your fitness companion. We are excited to embark on this health and wellness journey together. Let's get started!

                //        Best regards,

                //        The Gymozy Team</p>


                // `
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
                let token = await userLogin.generateAuthToken();
                // res.cookie('_jwtoken', token, {
                //     expires: new Date(Date.now() + 25892000000),
                //     sameSite: "none",
                //     secure: true
                // })
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


                return res.status(200).json({ message: "Login successfully", token: token })

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

userrouter.get('/user/islogin/:token', authenticate, (req, res) => {
    res.status(200).json({ message: req.userID });


})
userrouter.get('/logout/:token', authenticate, (req, res) => {
    res.status(200).send("user logout successfully")
})

userrouter.get('/user/islogin/getdata/mybooking/:token', authenticate, async (req, res) => {
    const id = req.userID;

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
