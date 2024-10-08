import express from 'express'
import {recruitmentController} from '../modules/recruitment/recruitmentController.js'
import {upload} from "../middlewares/multipleUploadMiddleware.js";
import isAuth from "../middlewares/authMiddleware.js";

const Router = express.Router()

Router.route('/')
    .post(isAuth,upload.single('images'), recruitmentController.addRecruitment)
    .get(recruitmentController.getRecruitment)
Router.route('/views').get(recruitmentController.getTopViews)
Router.route('/featured').get(recruitmentController.getFeatured)
Router.route('/search').get(recruitmentController.search)
Router.route('/:id')
    .post(isAuth,recruitmentController.addRecruitmentDetail)
    .get(recruitmentController.getRecruitmentbyid)
    .delete(isAuth,recruitmentController.deleteRecruitment)
    .patch(isAuth,upload.single('images'), recruitmentController.updateRecruitment)


export const recruitmentRoute = Router