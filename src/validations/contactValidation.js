const Joi = require("joi")
import { validConst as vc } from "~/utils/validConst"

const sendMessage = async (req, res, next) => {
  const data = req.body
  const correct = Joi.object({
    name: vc.STRING.required(),
    phone: vc.PHONENUMBER.required(),
    title: vc.STRING.required(),
    email: vc.EMAIL.required(),
    content: vc.STRING.required(),
  })

  try {
    await correct.validateAsync(data, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

export const contactValidation = {
  sendMessage
}