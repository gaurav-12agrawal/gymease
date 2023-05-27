const Joi = require('joi')

const validateuser = (req, res, next) => {
    const userSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.number().required(),
        password: Joi.string().required().min(8).max(20),
        cpassword: Joi.string().required().min(8).max(20)
    });
    const result = userSchema.validate(req.body)

    if (result.error) {
        console.log(result.error)
        return res.sendStatus(400)
    }
    else {
        next();
    }
}
module.exports = validateuser;
