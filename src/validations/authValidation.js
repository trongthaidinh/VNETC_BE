import Joi from "joi";
import { validConst as vc } from "../utils/validConst.js"

const login = async (req, res, next) => {
  const correct = Joi.object({
    email: vc.EMAIL.required(),
    password: vc.STRING.required()
  })

  try {
    await correct.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

export const authValidation = {
  login
}