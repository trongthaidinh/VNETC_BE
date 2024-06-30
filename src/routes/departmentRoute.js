import express from 'express'
import isAuth from '~/middlewares/authMiddleware'
import { deparmentController } from '~/modules/department/departmentController'
const Router = express.Router()

Router.route('/')
 .post(isAuth,deparmentController.create)
 .get(deparmentController.getAll)

export const departmentRoute = Router