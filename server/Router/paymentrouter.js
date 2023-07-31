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
        html: `
        
        <div  style="display:flex;justify-content:center;align-items:center; margin:auto;" >
        <img  alt="Image" style="width: 50%; height: 50%; margin:auto;  border-radius:100%;" src= 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128198/Important%20image/logo_zzpwsu.jpg' ></img></div> 
         <br/><br/><br/>
        <div style="width: 100%; height: 90px; background-color:green;display:flex;
        justify-content:center;align-items:center; margin:auto;" ><p style="color:white; font-size:20px ;margin:auto;" >Payment Receipt Verification</p></div>

        <h2>Dear ${req.body.yname},</h2>
               <p>We are delighted to inform you that your gym session booking with Gymozy was successful! We look forward to having you join us for an invigorating fitness experience. Before we proceed, we kindly request you to verify your Gmail address.

               <br/><br/>

               To complete the verification process, please click on the link provided below:

               </p>
               
               
               <a href="https://gym-54v4.onrender.com/item/verifyemail/${token}/${email} " >Verify Email</a><br/>
               <p>
               By verifying your Gmail address, you'll receive important updates about your booking, exclusive offers, and valuable fitness-related content to support you on your fitness journey.<br/><br/><br/>
               
               Once you have verified your email address, we will promptly send you the payment receipt for your recent booking. Rest assured, your payment is confirmed, and your spot is reserved for the specified date and time.

<br/><br/><br/>
               
If you have any questions or need further assistance regarding the verification process, your booking, or any other matter, don't hesitate to contact our friendly support team at support.gymozy@gmail.com . We are here to assist you and ensure a smooth experience.

<br/><br/><br/>
               
               Thank you for choosing Gymozy as your fitness companion. We are excited to embark on this health and wellness journey together. Let's get started!<br/><br/><br/>
               
               Best regards,<br/><br/>
               
               The Gymozy Team</p>
               
               
        
        `
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

            const mailOptions = {
                from: process.env.MAIL_USERNAME_PAYMENT,
                to: maillist,
                subject: "Payment Reciept",
                // html: `<h1>${validitem.name} Thanks for choosing us</h1>
                //    <h5>you have sent INR - ${validitem.amount}</h5>
                //    <h5>Your order id is - ${validitem._id}</h5>
                //    <h5>Remaining detials you can see in My booking section on our website </h5>
                //    <img alt="Image" style="width: ${width}px; height: ${height}px;" src= '${validitem.images[0].url}' ></img>

                //   `
                html: `
                  <div  style="display:flex;justify-content:center;align-items:center; margin:auto;" >
                  <img  alt="Image" style="width: 50%; height: 50%; margin:auto;  border-radius:100%;" src= 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128198/Important%20image/logo_zzpwsu.jpg' ></img></div> 
                   <br/><br/><br/>
                  <div style="width: 100%; height: 90px; background-color:green;display:flex;
                  justify-content:center;align-items:center; margin:auto;" ><p style="color:white; font-size:20px ;margin:auto;" >Payment Confirmation Mail</p></div>
                  <h2>Dear ${validitem.name},</h2>
                  <p>Thank you for choosing <b>Gymozy</b> for your fitness needs! We are excited to confirm your booking for the following session:
                  </p>
                  <p>Booking ID: ${validitem._id}</p>
                  <p>Payment Amount:INR- ${validitem.amount}</p>
  
                  <P>Please find below the payment screenshot for your reference:</P>
                  <img alt="Image" style="width: 100%; height: 100%;display:flex;
                  justify-content:center;align-items:center; margin:auto;border-radius:7px;" src= '${validitem.images[0].url}' ></img>
                  <p>For remaining details please visit gymozy.com/booking </p>
                  <p>
                  Your payment has been successfully processed, and your booking is <b>confirmed</b> within 24 hour upon receiving your accurate payment details. You are all set to achieve your fitness goals with us!<br/><br/>
  
  As part of our commitment to providing exceptional service, we will generate and send your detailed invoice within the next 24 hours. This invoice will include a breakdown of the services booked and any applicable discounts.<br/><br/>
  
  Should you have any questions or need further assistance, please feel free to contact our friendly customer support team at support.gymozy@gmail.com .<br/><br/>
  
  Thank you for being a valued member of our fitness community. We look forward to seeing you at the gym and helping you make progress towards a healthier and stronger you!<br/><br/><br/>
  
  Best regards,<br/><br/>
                         
  The Gymozy Team</p>
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


            return res.status(200).send(`Congratulations! Your email ${email}  on Gymozy has been successfully verified, and we have promptly sent the booking details to your mail id for a seamless experience`);
        } else {
            return res.status(401).json({ status: 401, message: "Your ticket expired ,if you have paid for the booking then contact to Gymozy in contact us section or direct mail us on support.gymozy@gmail.com . " })
        }

    }
    catch (error) {
        res.status(401).json({ status: 401, error })
    }
})


paymentrouter.patch('/item/cenclemyitem/:id/:token', authenticate, async (req, res) => {
    const id = req.params.id


    const item = await Item.findByIdAndUpdate(id, { cbyuser: 1 }, { new: true });
    const time = new Date().getTime();

    if (item.isvalid != 2 && time < item.joiningdate) {
        await item.save();
        // create mail
        const email1 = process.env.Email

        var maillist = [
            email1,
            item.email
        ];
        const mailOptions = {
            from: process.env.MAIL_USERNAME_CENCEL,
            to: maillist,
            subject: "Cencellation request",
            // html: `<h1> We have received cancellation request for you booking ... </h1>
            //            <h5>Your order id is ${id}</h5>
            //            <h4> We will refund you in next 24 working hours<h4>`
            html: `
            <div  style="display:flex;justify-content:center;align-items:center; margin:auto;" >
            <img  alt="Image" style="width: 50%; height: 50%; margin:auto;  border-radius:100%;" src= 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128198/Important%20image/logo_zzpwsu.jpg' ></img></div> 
             <br/><br/><br/>
            <div style="width: 100%; height: 90px; background-color:green;display:flex;
            justify-content:center;align-items:center; margin:auto;" ><p style="color:white; font-size:20px ;margin:auto;" >Gymozy Verification Link</p></div>
            <h3>Order ID:${id.toUpperCase()}</h3>
                   <p>We hope this email finds you well. We are writing to confirm that we have received your cancellation request for the order with ID <b>${id.toUpperCase()}</b>.
                   <br/><br/></p>
                 
                   <p>
                   We understand that sometimes plans change, and we are committed to ensuring your satisfaction. Rest assured that we are processing your cancellation request, and we will take care of it promptly.<br/><br/>

As per our policy, we will cancel your order within the next 24 hours and initiate the refund process. Please note that the refund will be processed back to the original payment method used during the purchase.<br/><br/>

While the refund will be initiated immediately, please allow 5-7 working days for the funds to reflect in your account. This duration may vary depending on your bank or financial institution's processing time.<br/><br/>

If you have any further questions or require any assistance, please don't hesitate to contact our customer support team at support.gymozy@gmail.com. We are here to help!<br/><br/>

Once again, we apologize for any inconvenience this cancellation may have caused. We value your patronage and hope to serve you again in the future.<br/><br/>

Thank you for your understanding.<br/><br/>

Best regards,<br/><br/>

Team Gymozy
                  </p>
                   
            `
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