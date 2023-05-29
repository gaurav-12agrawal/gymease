const express = require('express');
const paymentrouter = express.Router();
const multer = require('multer')
const storage = require('../cloudinary/index')
const upload = multer(storage)
const authenticate = require('../Middleware/authentication')
const User = require('../models/userschema')
const Item = require('../models/itemschema');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')


// mail sender detail
let transporter = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME_PAYMENT,
        pass: process.env.MAIL_PASSWORD_PAYMENT
    },
    tls: {
        rejectedUnauthorized: false
    }
});
let transporter1 = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME_CENCEL,
        pass: process.env.MAIL_PASSWORD_CENCEL
    },
    tls: {
        rejectedUnauthorized: false
    }
});
let transporter2 = nodemailer.createTransport({
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





// store payment form to mongodb


paymentrouter.post('/gym/:id/paymentform/:token', authenticate, upload.array('image'), async (req, res) => {
    if (!req.body.name || !req.body.address || !req.body.days || !req.body.price || !req.body.yname || !req.body.number.length === 10 || !req.body.email || req.files.length === 0 || !req.body.date || !req.body.month || !req.body.year) { return res.sendStatus(400) }
    const gym_id = req.params.id;
    const id = req.userID;
    const user = await User.findById({ _id: id });
    const item = new Item({
        gymid: gym_id,
        amount: req.body.price,
        type: req.body.days,
        name: req.body.yname,
        email: req.body.email,
        phone: req.body.number,
        gymname: req.body.name,
        gymaddress: req.body.address,
        isvalid: 0,
        isverified: false,
        cbyuser: 0
    })
    item.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    const hour = '00';
    const minute = '00';
    const second = '00';
    const dynamicDate = new Date(req.body.year, req.body.month - 1, req.body.date, hour, minute, second);
    const joiningtime = dynamicDate.getTime();
    const currenttime = Date.now();
    item.currentdate = currenttime;
    item.joiningdate = joiningtime;
    let time = 0;
    if (req.body.days === '15 days with trainer' || req.body.days === '15 days without trainer')
        time = 1296000000;
    else if (req.body.days === '1 month with trainer' || req.body.days === '1 month without trainer')
        time = 2592000000;
    else if (req.body.days === '3 month with trainer' || req.body.days === '3 month without trainer')
        time = 7776000000;
    else if (req.body.days === '6 month with trainer' || req.body.days === '6 month without trainer')
        time = 15724800000;
    else if (req.body.days === '1 year with trainer' || req.body.days === '1 year without trainer')
        time = 31536000000;
    item.expiredate = item.joiningdate + time;
    // token generate for reset password
    const token = jwt.sign({ _id: id }, process.env.MY_SECRET, {
        expiresIn: "3600s"
    });
    item.verifytoken = token;
    const pushuser = await User.findById({ _id: id });
    pushuser.items.push(item)
    await item.save();
    await pushuser.save();
    const email = req.body.email;
    // create mail
    const mailOptions = {
        from: process.env.MAIL_USERNAME_VERIFY,
        to: email,
        subject: "Verify your id for payment information",
        html: `<h1>${req.body.yname} Thanks for choosing us</h1>
                       <h5>Please verify your email...</h5>
                       <a href="https://gym-54v4.onrender.com/item/verifyemail/${token}/${email} " >verify Here</a>`
    }
    //send mail
    transporter2.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error", error);
            return res.status(401).json({ status: 401, message: "email not send" })
        } else {
            console.log("Email sent Successfully", info.response);
            return res.status(201).json({ status: 201, message: "Email sent Succsfully" })
        }
    })


    res.sendStatus(200)
})

// verify user for forgot password time
paymentrouter.get('/item/verifyemail/:token/:email', async (req, res) => {
    const token = req.params.token
    const email = req.params.email

    try {
        const validitem = await Item.findOne({ email: email, verifytoken: token });
        const verifyToken = jwt.verify(token, process.env.MY_SECRET);
        if (validitem && verifyToken._id) {
            validitem.verifytoken = null;
            validitem.isverified = true;
            await validitem.save();
            // create mail
            const email1 = process.env.Email
            var maillist = [
                email1,
                email
            ];
            const width = 250;
            const height = 300;
            console.log(validitem.images[0].url)
            const mailOptions = {
                from: process.env.MAIL_USERNAME_PAYMENT,
                to: maillist,
                subject: "Payment Reciept",
                html: `<h1>${validitem.name} Thanks for choosing us</h1>
                   <h5>you have sent INR - ${validitem.amount}</h5>
                   <h5>Your order id is - ${validitem._id}</h5>
                   <h5>Remaining detials you can see in My booking section on our website </h5>
                   <img alt="Image" style="width: ${width}px; height: ${height}px;" src= '${validitem.images[0].url}' ></img>

                  `
            }
            //send mail
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    return res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent Successfully", info.response);
                    return res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                }
            })


            return res.status(200).send('We have send payment details on your mail id');
        } else {
            return res.status(401).json({ status: 401, message: "Your ticket expired ,if you have paid money than contact to GymEase in contact us section and see your item in mybooking section" })
        }

    }
    catch (error) {
        res.status(401).json({ status: 401, error })
    }
})


paymentrouter.patch('/item/cenclemyitem/:id/:token', authenticate, async (req, res) => {
    const id = req.params.id
    console.log(id)

    const item = await Item.findByIdAndUpdate(id, { cbyuser: 1 }, { new: true });
    const time = new Date().getTime();

    if (item.isvalid != 2 && time < item.joiningdate) {
        await item.save();
        // create mail
        const email1 = process.env.Email
        console.log(email1)
        var maillist = [
            email1,
            item.email
        ];
        const mailOptions = {
            from: process.env.MAIL_USERNAME_CENCEL,
            to: maillist,
            subject: "Cencellation request",
            html: `<h1> We have received cancellation request for you booking ... </h1>
                       <h5>Your order id is ${id}</h5>
                       <h4> We will refund you in next 24 working hours<h4>`
        }
        //send mail
        transporter1.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                return res.status(401).json({ status: 401, message: "email not send" })
            } else {
                console.log("Email sent Successfully", info.response);
                return res.status(201).json({ status: 201, message: "Email sent Succsfully" })
            }
        })
        res.sendStatus(200);
    }

    else return res.sendStatus(401)
})

module.exports = paymentrouter;