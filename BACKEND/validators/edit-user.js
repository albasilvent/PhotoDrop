const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string(),
    surname1: Joi.string(),
    surname2: Joi.string(),
    country: Joi.string(),
});
