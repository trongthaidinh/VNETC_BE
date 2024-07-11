import express from 'express'
import { newsController } from '~/modules/news/newsController'
import {upload} from "~/middlewares/multipleUploadMiddleware";
const Router = express.Router()

Router.route('/')
    .post(upload.single('images'),newsController.addNews)
    
    
Router.route('/:id')
    .post(newsController.addNewsDetail)

export const newsRoute = Router