const express = require('express');
const router = express.Router();
const gyms = require('../models/gymschema')
const authenticate = require('../Middleware/authentication')
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const jwt = require('jsonwebtoken')
const validategym = require('../Middleware/validatagym')
const authorization = require('../Middleware/authorization');
const authenticateboth = require('../Middleware/authenticateboth');
const multer = require('multer')
const storage = require('../cloudinary/index')
const upload = multer(storage)
// gyms set router

router.post('/setgyms', authorization, upload.array('image'), async (req, res) => {
    const address = (req.body.address).toLowerCase();
    if (!(req.files.length) || !req.body.name || !req.body.city || !req.body.address || !req.body.url || !req.body.information || !req.body.workouts || !req.body.facilities || !req.body.ac || !req.body.varified || !req.body.timinge || !req.body.timings || !req.body.sexf || !req.body.sexm) {
        return res.sendStatus(400)
    }
    const gym = new gyms({ name: req.body.name, city: req.body.city, address, url: req.body.url, information: req.body.information, workouts: req.body.workouts, facilities: req.body.facilities, price: { fifdays: req.body.pricef, month: req.body.pricem, threemonth: req.body.pricetm, sixmonth: req.body.pricesm, oneyear: req.body.pricey, fifdayst: req.body.priceft, montht: req.body.pricemt, threemontht: req.body.pricetmt, sixmontht: req.body.pricesmt, oneyeart: req.body.priceyt }, sex: { male: req.body.sexm, female: req.body.sexf }, timing: { start: req.body.timings, end: req.body.timinge }, ac: req.body.ac, varified: req.body.varified })
    gym.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await gym.save()
    res.sendStatus(200)
})

// get gyms

router.get('/getgym/:city', async (req, res) => {

    const address = (req.params.city).toLowerCase();


    if (!address) {
        return res.sendStatus(400);
    }
    try {
        const gymexist = await gyms.find({ address: { $regex: address } }).populate('reviews')
        if (!gymexist) {
            return res.sendStatus(400);
        }
        res.status(200).json(gymexist)

    } catch (error) {
        console.log(error)
    }

})

// get single gyms

router.get('/getsinglegym/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.sendStatus(400);
    }
    try {
        const gymexist = await gyms.findById({ _id: id }).populate(
            {
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })

        if (!gymexist) {
            return res.sendStatus(400);
        }
        res.status(200).json(gymexist)

    } catch (error) {
        console.log(error)
    }

})
// delete card
router.delete("/deletecard/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteuser = await gyms.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteuser);
    } catch (e) {
        res.status(422).json(e);

    }
})

//  getsingle card

router.get("/getcard/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cardindividual = await gyms.findById({ _id: id });
        res.status(201).json(cardindividual);
    } catch (e) {
        res.status(422).json(e);

    }
})
//updata card
router.patch("/updatecard/:id", upload.array('image'), authorization, async (req, res) => {

    if (!req.body.name || !req.body.city || !req.body.address || !req.body.url || !req.body.information || !req.body.workouts || !req.body.facilities || !req.body.ac || !req.body.varified || !req.body.timinge || !req.body.timings || !req.body.sexf || !req.body.sexm) {
        return res.sendStatus(400)
    }
    req.body.address = (req.body.address).toLowerCase();
    const { id } = req.params;

    const updatecard = await gyms.findByIdAndUpdate(id, {
        name: req.body.name, city: req.body.city, address: req.body.address, url: req.body.url, information: req.body.information, workouts: req.body.workouts, facilities: req.body.facilities,
        "price.fifdays": req.body.pricef, "price.month": req.body.pricem, "price.threemonth": req.body.pricetm, "price.sixmonth": req.body.pricesm, "price.oneyear": req.body.pricey, "price.fifdayst": req.body.priceft, "price.montht": req.body.pricemt, "price.threemontht": req.body.pricetmt, "price.sixmontht": req.body.pricesmt, "price.oneyeart": req.body.priceyt, "sex.male": req.body.sexm, "sex.female": req.body.sexf, ac: req.body.ac, varified: req.body.varified, "timing.start": req.body.timings, "timing.end": req.body.timinge

    }, { new: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    updatecard.images.push(...imgs);

    await updatecard.save();
    res.sendStatus(200)
})
// check editable user
router.get("/iseditable/:id", authorization, async (req, res) => {
    res.sendStatus(200)
})

//payment Route
router.get("/getsinglegym/:id/payment/:token", authenticate, async (req, res) => {
    res.sendStatus(201).json();

})
module.exports = router;