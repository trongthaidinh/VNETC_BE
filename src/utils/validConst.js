import Joi from "joi"
const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
const PHONENUMER_REGEX = /^[0-9]{10,11}$/


const STRING = Joi.string()
const NUMBER = Joi.number()
const BOOLEAN = Joi.boolean()

const OBJECT_ID = STRING.pattern(OBJECT_ID_RULE)
const PHONENUMBER = STRING.pattern(PHONENUMER_REGEX).message('Phone number is not valid')
const EMAIL = STRING.email().message('Email is not valid')
const URL = STRING.uri().message('Uri is not valid')

const ARRAY = (object) => {
  return Joi.array().items(object)
}

export const validConst = {
  STRING, NUMBER, BOOLEAN, ARRAY,
  OBJECT_ID, PHONENUMBER, EMAIL, URL
}