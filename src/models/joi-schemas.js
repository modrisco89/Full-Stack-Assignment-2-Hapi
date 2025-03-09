import Joi from "joi";

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const infoSpec = {
  title: Joi.string().required(),
  artist: Joi.number().required(),
  duration: Joi.date().allow(""),
  genre: Joi.string().required(),
};

export const venueSpec = {
  title: Joi.string().required(),
  description: Joi.string().required().max(32),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
};
