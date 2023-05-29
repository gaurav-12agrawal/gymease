const express = require('express');
const superadminrouter = express.Router();
const bcrypt = require('bcryptjs')
const Superadmin = require('../models/superadminschema')
const Admin = require('../models/adminschema')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
superadminrouter.use(cookieParser());
const authorization = require('../Middleware/authorization');
const nodemailer = require('nodemailer')

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

// super admin register
// superadminrouter.post('/register/super/admin/rinesh', async (req, res) => {
//     const { name, email, password } = req.body;

//     if ((!name || !password || !email)) {
//         return res.status(400).json({ Message: "Invalid Data" })
//     }

//     if ((password.length < 10)) {
//         return res.status(400).json({ Message: "password should be greater than 10 digits" })

//     }
//     const adminExist = await Superadmin.findOne({ email })
//     if (adminExist) return res.status(400).json({ Message: "Admin Already Exist" })
//     const admin = new Superadmin({ name, email, password })
//     await admin.save()

//     res.status(201).json({ Message: "Super Admin Created" })
// })

// super admin login
superadminrouter.post('/login/super/admin/rinesh', async (req, res) => {
    res.clearCookie('jwtokensuperadmin', { path: '/' });
    const { name, email, password } = req.body;
    if ((!name || !password || !email)) {
        return res.status(400).json({ Message: "Invalid Data" })
    }

    const adminExist = await Superadmin.findOne({ email, name })
    if (!adminExist) { return res.status(400).json({ Message: "superAdmin Not Exist" }) }

    if (adminExist) {
        const Ismatch = await bcrypt.compare(password, adminExist.password)
        if (Ismatch) {
            let token = await adminExist.generateAuthTokenAdmin();

            // res.cookie('jwtokensuperadmin', token, {
            //     expires: new Date(Date.now() + (1 * 3600 * 1000)),
            //     httpOnly: true
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
            return res.status(201).json({ Message: "Login Successfully" })
        }

        else { return res.status(404).json({ Message: "superAdmin Not Found" }) }


    }
})

// admin by superadmin

superadminrouter.post('/register/admin/bysadmin', async (req, res) => {
    const { name, email, password, sname, semail, spassword } = req.body;
    if (!name || !email || !password || !sname || !semail || !spassword) {
        return res.status(400).json({ Message: "Invalid Data" })
    }
    if (password.length < 10) {
        return res.status(400).json({ Message: "password should be greater than 10 digits" })

    }

    const adminExist = await Superadmin.findOne({ email: semail, name: sname })
    if (!adminExist) { return res.status(400).json({ Message: "you are not a super admin" }) }

    if (adminExist) {
        const Ismatch = await bcrypt.compare(spassword, adminExist.password)
        if (Ismatch) {
            const userExist = await Admin.findOne({ email })
            if (userExist) { return res.status(400).json({ Message: "you are already a admin" }) }
            else {
                const user = new Admin({ name, email, password })
                await user.save()
                res.status(201).json({ Message: "Admin Created" })
            }
        }

        else { return res.status(404).json({ Message: "you are not a super admin" }) }


    }


})



// logout for admin

superadminrouter.get('/logout/superadminringrg/:token', authorization, (req, res) => {
    res.status(200).send("Admin logout successfully")
})



//                               forget passowrd





// send email Link For reset Password
superadminrouter.post("/sendpasswordlinkadmin", async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        return res.status(401).json({ status: 401, message: "Enter Your Email" })
    }

    try {
        const userfind = await Superadmin.findOne({ email, name });

        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, process.env.MY_SECRET_SUPER_ADMIN, {
            expiresIn: "120s"
        });
        const setusertoken = await Superadmin.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });

        if (setusertoken) {
            const mailOptions = {
                from: process.env.MAIL_USERNAME_VERIFY,
                to: email,
                subject: "Sending Email For password Reset for Super Admin",
                text: `This Link Valid For 2 MINUTES https://gymease.netlify.app/forgetpasswordadmin/${userfind._id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                }
            })

        }

    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid Admin" })
    }

});

// verify user for forgot password time
superadminrouter.get("/forgetpasswordadmin/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    try {
        const validadmin = await Superadmin.findOne({ _id: id, verifytoken: token });


        const verifyToken = jwt.verify(token, process.env.MY_SECRET_SUPER_ADMIN);

        if (validadmin && verifyToken._id) {
            return res.status(201).json({ status: 201, validadmin })
        } else {
            res.status(401).json({ status: 401, message: "super admin not exist" })
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({ status: 401, error })
    }
});




// change password

superadminrouter.post("/admin/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const { password, cpassword } = req.body;
    if (password.length < 10 || password !== cpassword)
        return res.sendStatus(401)
    try {
        const validuser = await Superadmin.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, process.env.MY_SECRET_SUPER_ADMIN);
        validuser.verifytoken = null
        await validuser.save();
        console.log(validuser.verifytoken)
        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);
            const setnewuserpass = await Superadmin.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setnewuserpass.save();
            res.status(201).json({ status: 201, setnewuserpass })

        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})
module.exports = superadminrouter;
