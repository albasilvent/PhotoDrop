const Joi = require("joi");

module.exports = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
})
.or('title', 'description')
.required();