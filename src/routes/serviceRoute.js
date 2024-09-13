import express from 'express'
import {serviceController} from '../modules/service/serviceController.js'
import {upload} from "../middlewares/multipleUploadMiddleware.js";
import isAuth from "../middlewares/authMiddleware.js";

const Router = express.Router()

Router.route('/')
    .post(isAuth,upload.single('images'), serviceController.addService)
    .get(serviceController.getService)
Router.route('/views').get(serviceController.getTopViews)
Router.route('/featured').get(serviceController.getFeatured)
Router.route('/search').get(serviceController.search)
Router.route('/:id')
    .post(isAuth,serviceController.addServiceDetail)
    .get(serviceController.getServicebyid)
    .delete(isAuth,serviceController.deleteService)
    .patch(isAuth,upload.single('images'), serviceController.updateService)


export const serviceRoute = Router