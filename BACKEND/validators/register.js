// Validamos los datos del registro con Joi.
const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  surname1: Joi.string().required(),
  surname2: Joi.string().optional().allow(''),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  birthDate: Joi.date().required(),
  country: Joi.string().optional().allow(''),
  acceptedTOS: Joi.bool().required(),
});