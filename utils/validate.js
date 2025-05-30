const Joi=require('joi');

const registerValidation=Joi.object({
  username: Joi.string().min(3).max(30).required(),
  branch: Joi.string().required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref('password'),
  birthdate: Joi.date().required(),
  gender: Joi.string().valid('male', 'female').required(),
  role: Joi.string().valid('admin', 'staff').required()
});

const loginValidation=Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
});

const transportValidation = Joi.object({
  branch: Joi.string().required(),
  model: Joi.string().required(),
  color: Joi.string().required(),
  img: Joi.string().uri(),
  price: Joi.number().required(),
  time: Joi.date().default(() => new Date(), 'default current time')
});

module.exports = {
  registerValidation,
  loginValidation,
  transportValidation
};