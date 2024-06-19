import express from 'express'
import { accountController as conntrol } from '~/modules/account/accountController'
import { accountValidation as valid } from '~/validations/accountValidation'
const Router = express.Router()

Router.route('/')
    .post(valid.addAccount, conntrol.addAccount)
    .put(conntrol.changePassword)
    .delete(conntrol.deleteAccount)
    .patch(conntrol.updateAccount)
    .get(conntrol.getAllAccount)


export const accountRoute = Router