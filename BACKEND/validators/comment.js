const Joi = require("joi");

module.exports = Joi.object({
    comment: Joi.string().required(),
  });