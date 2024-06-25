import express from 'express'
import { contactController as controll } from '~/modules/contact/contactController'
import { contactValidation as validate} from '~/validations/contactValidation'
const Router = express.Router()

Router.route('/')
 .post(validate.sendMessage,controll.sendMessage)
 .get(controll.getMessage)

Router.route('/:id')
    .delete(controll.deleteMessage)

export const contactRoute = Router