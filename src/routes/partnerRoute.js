import express from 'express'
import isAuth from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/multipleUploadMiddleware.js'
import { partnerController as controll} from '../modules/partner/partnerController.js'
const Router = express.Router()

Router.route('/:id')
    .delete(isAuth,controll.deleteById)

Router.route('/')
    .post(isAuth,upload.single('image'), controll.create)
    .get(controll.getAll)

export const partnerRoute = Router