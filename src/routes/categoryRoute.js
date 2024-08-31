import express from 'express'
import { categoryController, categoryController as controller} from '~/modules/category/categoryController'
import isAuth from "~/middlewares/authMiddleware";
import { upload } from "~/middlewares/multipleUploadMiddleware";

const Router = express.Router()

Router.route('/')
    .get(controller.getCates)
    .post(isAuth,upload.single('image'), categoryController.addCategory)
Router.route('/:id')
    .get(controller.getCateById)
    .patch(isAuth,controller.updateCate)
    .delete(isAuth,controller.deleteCate)
Router.route('/type').get(controller.getByType)

export const categoryRoute = Router