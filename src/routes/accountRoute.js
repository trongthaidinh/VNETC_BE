import express from 'express'
import { accountController as conntrol } from '~/modules/account/accountController'
import { accountValidation as valid } from '~/validations/accountValidation'
const Router = express.Router()

Router.route('/')
 .post(valid.addAccount,conntrol.addAccount)

export const accountRoute = Router