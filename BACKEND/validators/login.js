// Validamos los datos del login con Joi.
const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});