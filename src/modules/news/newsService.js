import {accountService} from "../account/accountService";

import uploadSingleImageToCloudinary from "~/utils/uploadSingleImage"
import {body} from "express-validator";
import {log} from "console";
import ApiErr from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";

const {Category} = require("~/models/categoryModel");
const {News, NewsDetail} = require("~/models/newsModel")

const findAllNews = async (data) => {
    const {page = 0, limit = 100, categoryId} = data
    const query = categoryId || {}

    const news = await News.find(query)
        .skip(page * limit)
        .limit(limit)
        .sort({createdAt: -1});

    return news
}
const createNews = async ({title, summary, views, categoryId, accCreateId}, image) => {
    try {
        const uploadImage = await uploadSingleImageToCloudinary(image.path);
        const images = uploadImage.secure_url;
        const [cateIdExist, account, findNew] = await Promise.all([ 
            Category.exists({_id: categoryId}),
            accountService.findById(accCreateId, {username: 1}),
            News.exists({title}),
        ]);
        if (findNew) throw new ApiErr(StatusCodes.BAD_REQUEST, "Already exists");
        if (!cateIdExist) {
            throw new ApiErr(StatusCodes.BAD_REQUEST, "CategoryId does not exist");
        }
        // Create the news object
        const news = new News({
            title,
            summary,
            views,
            images,
            categoryId,
            createdBy: account.username
        });
        await news.save();
        return news;
    } catch (error) {
        throw error;
    }
};


const createNewsDetail = async (data) => {
    const {content, newsId, accCreateId} = data

    const newsIdExists = await News.exists({_id: newsId})
    if (!newsIdExists) {
        throw new Error('NewsId is not exists')
    }

    const account = await accountModel.getAccountById(accCreateId, {username: 1})

    const newsDetail = new NewsDetail({content, newsId, createdBy: account.username})
    await newsDetail.save()

    return newsDetail
}

const getNewsByCateId = async (categoryId) => {
    const news = await News.find({categoryId})
    return news
}
const getNewsDetailByNewsId = async (newsId) => {
    const newsDetail = await NewsDetail.find({newsId})
    return newsDetail
}
const updateNews = async (data) => {
    const {id, newData} = data
    const updated = await News.findByIdAndUpdate(id, newData)
    if (!updated) {
        throw new Error('update fail')
    }
    return updated
}
const updateNewsDetail = async (data) => {
    const {id, newData} = data
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

    const newsDetailExist = await NewsDetail.exists({newsId: news._id})
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