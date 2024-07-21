const Joi = require("joi");
import { validConst as vc } from "~/utils/validConst";

const create = async (req, res, next) => {
  const data = req.body;
  const correct = Joi.object({
    username: vc.STRING.required(),
    password: vc.STRING.min(6)
      .message("Password must be larger 6 character")
      .required(),
    email: vc.EMAIL.required(),
    fullName: vc.STRING.required(),
  });

  try {
    await correct.validateAsync(data, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(444).json({
      message: error.message,
    });
  }
};
const login = async (req, res, next) => {
  const correct = Joi.object({
    email: vc.EMAIL.required(),
    password: vc.STRING.required(),
  });

  try {
    await correct.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const accountValidation = {
  create,
  login,
};
