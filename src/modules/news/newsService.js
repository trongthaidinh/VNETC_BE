import { accountService } from "../account/accountService";

const { Category } = require("~/models/categoryModel");
const { News, NewsDetail } = require("~/models/newsModel")

const findAllNews = async (data) => {
    const { page = 0, limit = 100, categoryId } = data
    const query = categoryId || {}

    const news = await News.find(query)
        .skip(page * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    return news
}
const createNews = async (data) => {
    const { title, summary, views, images, categoryId, accCreateId } = data

    const cateIdExist = await Category.exists({ _id: categoryId })
    if (!cateIdExist) {
        throw new Error('CategoryId is not exists')
    }

    const account = await accountService.findById(accCreateId, { username: 1 })

    const news = new News({ title, summary, views, images, categoryId, createdBy: account.username })
    await news.save()

    return news
}

const createNewsDetail = async (data) => {
    const { content, newsId, accCreateId } = data

    const newsIdExists = await News.exists({ _id: newsId })
    if (!newsIdExists) {
        throw new Error('NewsId is not exists')
    }

    const account = await accountModel.getAccountById(accCreateId,{username:1})

    const newsDetail = new NewsDetail({ content, newsId, createdBy: account.username })
    await newsDetail.save()

    return newsDetail
}

const getNewsByCateId = async (categoryId) => {
    const news = await News.find({ categoryId })
    return news
}
const getNewsDetailByNewsId = async (newsId) => {
    const newsDetail = await NewsDetail.find({ newsId })
    return newsDetail
}
const updateNews = async (data) => {
    const { id, newData } = data
    const updated = await News.findByIdAndUpdate(id, newData)
    if (!updated) {
        throw new Error('update fail')
    }
    return updated
}
const updateNewsDetail = async (data) => {
    const { id, newData } = data
    const updated = await NewsDetail.findByIdAndUpdate(id, newData)
    if (!updated) {
        throw new Error('update fail')
    }
    return updated
}
const deleteNews = async (id) => {
    const news = await News.findById(id)
    if (!news) {
        throw new Error('Not found news')
    }

    const newsDetailExist = await NewsDetail.exists({ newsId: news._id })
    if (newsDetailExist) {
        throw new Error('Lỗi khóa ngoại')
    }

    await news.deleteOne()
    return true
}
const deleteNewsDetail = async (id) => {
    const newsDetail = await NewsDetail.findByIdAndDelete(id)
    if (!newsDetail) {
        throw new Error('Delete fail')
    }
    return true
}

export const newsService = {
    createNews,
    createNewsDetail,
    findAllNews
}