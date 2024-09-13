import express from 'express'
import {authController} from '../modules/authen/authController.js'
import {authValidation} from '../validations/authValidation.js'

const Router = express.Router()

Router.route('/login')
    .post(authValidation.login, authController.login)
Router.route('/logout').post(authController.logout)

export const authRoute = Router