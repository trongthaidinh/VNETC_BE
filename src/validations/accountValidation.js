const Joi = require("joi")
import { validConst as vc } from "~/utils/validConst"

const addAccount = async (req, res, next) => {
  const data = req.body
  const correct = Joi.object({
    accCreateId: vc.OBJECT_ID.required(),
    username: vc.STRING.required(),
    password: vc.STRING.min(6).message('Password must be larger 6 character').required(),
    email: vc.EMAIL.required(),
    fullName: vc.STRING.required(),
  })

  try {
    await correct.validateAsync(data, { abortEarly: false })
    next()
  } catch (error) {
    console.log(error);
    res.status(444).json({
      message: error.message
    })
  }
}

export const accountValidation = {
  addAccount
}