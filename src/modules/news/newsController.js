import { newsService } from "./newsService"

const { newsModel } = require("~/models/newsModel")
const { SuccessRes } = require("~/utils/SuccessRes")

const addNews = async (req, res, next) => {
    try {
        const added = await newsService.createNews(req.body)
        SuccessRes(res,added,'Add news succesfull')
    } catch (error) {
        next(error)
    }
}
const addNewsDetail = async (req, res, next) => {
    try {
        const added = await newsService.createNewsDetail(req.body)
        SuccessRes(res,added,'Add news detail successful')
    } catch (error) {
        next(error)
    }
}

export const newsController = {
    addNews,
    addNewsDetail
}