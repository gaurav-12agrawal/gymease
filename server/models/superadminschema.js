const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const superadminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verifytoken: {
        type: String,
    }
})

superadminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        next();
    }
})
// generate admin authtoken
// we are generating token
superadminSchema.methods.generateAuthTokenAdmin = async function () {
    try {
        let token = jwt.sign({ _id: this._id, "admin": true }, process.env.MY_SECRET_SUPER_ADMIN)
        return token;
    }
    catch (err) {
        console.log(err)
    }
}


const Superadmin = mongoose.model('superadmin', superadminSchema, 'superadmin')
module.exports = Superadmin