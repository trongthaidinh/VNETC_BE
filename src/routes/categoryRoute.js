import express from 'express'
import { categoryController as controller} from '~/modules/category/categoryController'
const Router = express.Router()

Router.route('/')
    .get()
    .post(controller.addCategory)
    .put()
    .delete()

export const categoryRoute = Router