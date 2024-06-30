import express from 'express'
import isAuth from '~/middlewares/authMiddleware'
import { upload } from '~/middlewares/multipleUploadMiddleware'
import { productController as controll} from '~/modules/product/productController'
const Router = express.Router()

Router.route('/:id')
    .get(isAuth,controll.getProductById)

Router.route('/')
    .post(isAuth,upload.single('image'), controll.create)
    .get(isAuth,controll.getAll)

export const productRoute = Router