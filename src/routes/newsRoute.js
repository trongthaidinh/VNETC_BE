import express from 'express'
import {newsController} from '../modules/news/newsController.js'
import {upload} from "../middlewares/multipleUploadMiddleware.js";
import isAuth from "../middlewares/authMiddleware.js";

const Router = express.Router()

Router.route('/')
    .post(isAuth,upload.single('images'), newsController.addNews)
    .get(newsController.getNews)
Router.route('/views').get(newsController.getTopViews)
Router.route('/featured').get(newsController.getFeatured)
Router.route('/search').get(newsController.search)
Router.route('/:id')
    .post(isAuth,newsController.addNewsDetail)
    .get(newsController.getNewsbyid)
    .delete(isAuth,newsController.deleteNews)
    .patch(isAuth,upload.single('images'), newsController.updateNews)


export const newsRoute = Router