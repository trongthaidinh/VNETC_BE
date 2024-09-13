import express from 'express'
import isAuth from '../middlewares/authMiddleware.js'
import {accountController as conntrol} from '../modules/account/accountController.js'
import {accountValidation as valid} from '../validations/accountValidation.js'

const Router = express.Router()

Router.route('/')
    .post(isAuth, valid.create, conntrol.create)
    // .put(conntrol.changePassword)
    .delete(conntrol.deleteAccount)
    .patch(conntrol.updateAccount)
    .get(conntrol.getAllAccount)
Router.route('/:id').get(conntrol.getAccountById)
    .patch(conntrol.changePassword)
export const accountRoute = Router