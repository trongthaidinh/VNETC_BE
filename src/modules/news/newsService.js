import uploadSingleImageToCloudinary from "../../utils/uploadSingleImage.js"
import ApiErr from "../../utils/ApiError.js";
import {StatusCodes} from "http-status-codes";
import {io} from "../../../server.js";

import {Category} from  "../../models/categoryModel.js";
import { News, NewsDetail } from "../../models/newsModel.js";

const findAllNews = async (data) => {
    const {page = 1, limit = 10, categoryId, startDate, endDate} = data;

    let query = {};

    if (categoryId) {
        query.categoryId = categoryId;
    }

    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) {
            query.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
            query.createdAt.$lte = new Date(endDate);
        }
    }

    const skip = (page - 1) * limit;

    const [news, totalCount] = await Promise.all([
        News.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({createdAt: -1}),
        News.countDocuments(query)
    ]);

    return {
        news,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount
    };
};
const createNews = async ({title, summary, views, categoryId, content, isFeatured}, image, account) => {
    try {
        const uploadImage = await uploadSingleImageToCloudinary(image.path);
        if (!uploadImage) throw new ApiErr(StatusCodes.BAD_REQUEST, "Upload Image fail");
        const images = uploadImage.secure_url;

        const [cateIdExist, findNew] = await Promise.all([Category.exists({_id: categoryId}), News.exists({title}),]);

        if (findNew) throw new ApiErr(StatusCodes.BAD_REQUEST, "News with this title already exists");
        if (!cateIdExist) throw new ApiErr(StatusCodes.BAD_REQUEST, "Category ID does not exist");

        const news = new News({
            title, summary, views, images, categoryId, isFeatured, createdBy: account.username
        });
        const newsDetail = new NewsDetail({
            content, newsId: news._id, createdBy: account.username
        });

        await news.save();
        await newsDetail.save();

        // Bắn socket cho client khi thêm tin tức mới
        io.emit('newsAdded', news);

        return news;
    } catch (error) {
        throw error;
    }
};


const createNewsDetail = async (data, account) => {
    const {content, newsId} = data

    const newsIdExists = await News.exists({_id: newsId})
    if (!newsIdExists) {
        throw new Error('NewsId is not exists')
    }


    const newsDetail = new NewsDetail({content, newsId, createdBy: account.username})
    await newsDetail.save()

    return newsDetail
}

const getNewsByNId = async (newsId) => {
    try {
        const [news, newsDetail] = await Promise.all([News.findByIdAndUpdate(newsId, {$inc: {views: 1}}, // Increment the views count by 1
            {new: true, lean: true} // Return the updated document and convert to plain JS object
        ), NewsDetail.findOne({newsId}).lean()]);
        if (!news) {
            throw new Error(`News not found with id: ${newsId}`);
        }
        if (!newsDetail) {
            throw new Error(`NewsDetail not found with newsId: ${newsId}`);
        }
        news.content = newsDetail.content;
        return news
    } catch (e) {
        throw new Error('Error retrieving news: ' + e.message);
    }
};


const updateNews = async (id, data, file, account) => {
    try {
        const { content, images: oldImage } = data;

        let images;

        if (file) {
            images = await uploadSingleImageToCloudinary(file.path);
            images = images.secure_url; 
        } else {
            images = oldImage;
        }

        const [updatedNews, updatedNewsDetail] = await Promise.all([News.findByIdAndUpdate({_id: id}, {
            $set: {
                ...data,
                images,
                updatedBy: account.username
            }
        }, {new: true}), NewsDetail.findOneAndUpdate({newsId: id}, {
            $set: {
                content,
                updatedBy: account.username
            }
        }, {new: true}),]);

        if (!updatedNews) {
            throw new Error('News not found');
        }

        if (!updatedNewsDetail) {
            throw new Error('NewsDetail not found');
        }

        return {updatedNews, updatedNewsDetail};
    } catch (err) {
        throw new Error(`Error updating news: ${err.message}`);
    }
};


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
    if (news) {
        NewsDetail.deleteOne({newsId: news._id})
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
const getTopViews = async () => {
    try {
        const news = await News.find()
            .limit(8)
            .sort({views: -1});
        console.log(news)
        return news
    } catch (e) {
        throw e
    }
}
const getFeatured = async () => {
    try {
        const featured = await News.find({isFeatured: true}).limit(5).sort({createdAt: -1});
        return featured
    } catch (e) {
        throw e
    }
}
const searchNews = async (searchTerm, page, limit, startDate, endDate) => {
    try {
        const skip = (page - 1) * limit;
        let searchQuery = {
            $or: [
                {title: {$regex: searchTerm, $options: 'i'}},
                {summary: {$regex: searchTerm, $options: 'i'}}
            ]
        };

        if (startDate && endDate) {
            searchQuery.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        } else if (startDate) {
            searchQuery.createdAt = {$gte: new Date(startDate)};
        } else if (endDate) {
            searchQuery.createdAt = {$lte: new Date(endDate)};
        }
        const [news, totalCount] = await Promise.all([
            News.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .sort({createdAt: -1})
                .lean(),
            News.countDocuments(searchQuery)
        ]);

        const newsIds = news.map(item => item._id);
        const newsDetails = await NewsDetail.find({newsId: {$in: newsIds}}).lean();

        const fullNewsResults = news.map(newsItem => ({
            ...newsItem,
            content: newsDetails.find(detail => detail.newsId.toString() === newsItem._id.toString())?.content || null
        }));

        return {
            results: fullNewsResults,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    } catch (error) {
        console.error("Error searching news:", error);
        throw new ApiErr(StatusCodes.INTERNAL_SERVER_ERROR, "Error searching news");
    }
};


export const newsService = {
    createNews,
    createNewsDetail,
    findAllNews,
    deleteNews,
    updateNews,
    getNewsByNId,
    getTopViews,
    getFeatured,
    searchNews
}