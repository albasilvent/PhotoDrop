const Joi = require("joi");

module.exports = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    photo1: Joi.any(),
    photo2: Joi.any().optional(),
    photo3: Joi.any().optional(),
});
