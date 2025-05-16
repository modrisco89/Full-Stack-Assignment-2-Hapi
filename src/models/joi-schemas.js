import Joi from "joi";

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
};

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
};

export const passwordSpec = {
  password: Joi.string().min(8).required(),
};

export const infoSpec = {
  artist: Joi.string().required(),
  price: Joi.number().required(),
  date: Joi.date().allow(""),
  genre: Joi.string().required(),
};

export const venueSpec = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required().max(32),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  capacity: Joi.string().valid("Small", "Medium", "Large").required(),
  imagefile: Joi.any().optional(), 
  userid: Joi.string().optional()
});

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("G7m!xPz@qW9vK$2rTbC!4LdN6YfJ&X0Z").required(),
  })
  .label("JwtAuth");

