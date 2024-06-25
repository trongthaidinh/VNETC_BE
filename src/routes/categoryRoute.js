import express from 'express'
import { categoryController as controller} from '~/modules/category/categoryController'
const Router = express.Router()

Router.route('/')
    .get(controller.getCates)
    .post(controller.addCategory)
Router.route('/:id')
    .delete(controller.deleteCate)    

export const categoryRoute = Router