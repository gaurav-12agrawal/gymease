const Joi = require('joi')

const validategym = (req, res, next) => {
    const cardSchema = Joi.object().keys({
        name: Joi.string().required(),
        city: Joi.string().required(),
        url: Joi.string().required(),
        information: Joi.string().required(),
        workouts: Joi.string().required(),
        facilities: Joi.string().required(),
        address: Joi.string().required(),
        ac: Joi.boolean().required(),
        varified: Joi.boolean().required(),
        price: {
            fifdays: Joi.number().positive().allow("").allow(null),
            month: Joi.number().positive().allow("").allow(null),
            threemonth: Joi.number().positive().allow("").allow(null),
            sixmonth: Joi.number().positive().allow("").allow(null),
            oneyear: Joi.number().positive().allow("").allow(null)
        },
        timing: {
            start: Joi.string().required(),
            end: Joi.string().required()
        },
        sex: {
            male: Joi.boolean().required(),
            female: Joi.boolean().required()
        }

    });
    const result = cardSchema.validate(req.body)

    if (result.error) {
        console.log(result.error)
        return res.sendStatus(400)
    }
    else {
        next();
    }
}
module.exports = validategym;
