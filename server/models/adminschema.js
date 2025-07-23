const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        //Why it's important in this case: When saving or updating a document in MongoDB, you don't want to rehash the password every time you save the document. The isModified function allows you to perform the hash only if the password field has actually been changed. Otherwise, if password has not been modified, it skips the hashing process.
        this.password = await bcrypt.hash(this.password, 12)
        next();
    }
})
// generate admin authtoken
// we are generating token
adminSchema.methods.generateAuthTokenAdmin = async function () {
    try {
        let token = jwt.sign({ _id: this._id, "admin": true }, process.env.MY_SECRET_ADMIN)
        return token;
    }
    catch (err) {
        console.log(err)
    }
}


const Admin = mongoose.model('admins', adminSchema)
module.exports = Admin