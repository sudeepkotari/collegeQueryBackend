const Joi = require('joi')

const authSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})

module.exports = {
  authSchema,
  loginSchema
}
