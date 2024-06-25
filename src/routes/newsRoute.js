import express from 'express'
import { newsController } from '~/modules/news/newsController'
const Router = express.Router()

Router.route('/')
    .post(newsController.addNews)
    
    
Router.route('/:id')
    .post(newsController.addNewsDetail)

export const newsRoute = Router