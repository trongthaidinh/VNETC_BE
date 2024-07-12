import express from 'express'
import {newsController} from '~/modules/news/newsController'
import {upload} from "~/middlewares/multipleUploadMiddleware";

const Router = express.Router()

Router.route('/')
    .post(upload.single('images'), newsController.addNews)
    .get(newsController.getNews)
Router.route('/views').get(newsController.getTopViews)
Router.route('/featured').get(newsController.getFeatured)
Router.route('/:id')
    .post(newsController.addNewsDetail)
    .get(newsController.getNewsbyid)
    .delete(newsController.deleteNews)
    .patch(upload.single('images'), newsController.updateNews)

export const newsRoute = Router