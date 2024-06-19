import mongoose from "mongoose"
import { Category } from "./categoryModel"
const { Schema } = mongoose

const newsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
}, { timestamps: true })

const newsDetailSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    newsId:{
        type:Schema.Types.ObjectId,
        ref:'News'
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
}, { timestamps: true })


export const NewsDetail = mongoose.model('NewsDetail', newsDetailSchema)
export const News = mongoose.model('News', newsSchema)

const createNews = async (data) => {
    const {title, summary, views, images, categoryId, createdBy} = data

    const cateIdExist = await Category.exists({_id:categoryId})
    if (cateIdExist) {
        throw new Error('CategoryId is not exists')
    }

    const news = new News({title, summary, views, images, categoryId, createdBy})
    await news.save()

    return news
}
const createNewsDetail = async (data) => {
    const {content, newsId, createdBy} = data

    const newsIdExists = await News.exists({_id:newsId})
    if (!newsIdExists) {
        throw new Error('NewsId is not exists')
    }

    const newsDetail = new NewsDetail({content, newsId, createdBy})
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
    const {id,newData} = data
    const updated = await News.findByIdAndUpdate(id,newData)
    if (!updated) {
        throw new Error('update fail')
    }
    return updated
}
const updateNewsDetail = async (data) => {
    const {id,newData} = data
    const updated = await NewsDetail.findByIdAndUpdate(id,newData)
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

    const newsDetailExist = await NewsDetail.exists({newsId:news._id})
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

export const newsModel = {
    createNews,
    createNewsDetail,
    getNewsByCateId,
    getNewsDetailByNewsId,
    updateNews,
    updateNewsDetail,
    deleteNews,
    deleteNewsDetail
}