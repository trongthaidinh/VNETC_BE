import {accountService as recruitment, accountService} from "../account/accountService";

import uploadSingleImageToCloudinary from "~/utils/uploadSingleImage"
import {body} from "express-validator";
import {log} from "console";
import ApiErr from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";

const {Category} = require("~/models/categoryModel");
const {Recruitment, RecruitmentDetail} = require("~/models/recruitmentModel")

const findAllRecruitment = async (data) => {
    const {page, limit, categoryId} = data
    // const {page, limit} = data
    const query = categoryId ? {categoryId} : {};
    const recruitment = await Recruitment.find(query)
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({createdAt: -1});

    return recruitment
}
const createRecruitment = async ({title, summary, views, categoryId, content, isFeatured}, image, account) => {
    try {
        const uploadImage = await uploadSingleImageToCloudinary(image.path);
        if (!uploadImage) throw new ApiErr(StatusCodes.BAD_REQUEST, "Upload Image fail");
        const images = uploadImage.secure_url;

        const [cateIdExist, findNew] = await Promise.all([Category.exists({_id: categoryId}), Recruitment.exists({title}),]);

        if (findNew) throw new ApiErr(StatusCodes.BAD_REQUEST, "Recruitment with this title already exists");
        if (!cateIdExist) throw new ApiErr(StatusCodes.BAD_REQUEST, "Category ID does not exist");

        const recruitment = new Recruitment({
            title, summary, views, images, categoryId, isFeatured, createdBy: account.username
        });
        const recruitmentDetail = new RecruitmentDetail({
            content, recruitmentId: recruitment._id, createdBy: account.username
        });

        await recruitment.save();
        await recruitmentDetail.save();

        return recruitment;
    } catch (error) {
        throw error
    }
};


const createRecruitmentDetail = async (data, account) => {
    const {content, recruitmentId} = data

    const recruitmentIdExists = await Recruitment.exists({_id: recruitmentId})
    if (!recruitmentIdExists) {
        throw new Error('RecruitmentId is not exists')
    }


    const recruitmentDetail = new RecruitmentDetail({content, recruitmentId, createdBy: account.username})
    await recruitmentDetail.save()

    return recruitmentDetail
}

const getRecruitmentByNId = async (recruitmentId) => {
    try {
        const [recruitment, recruitmentDetail] = await Promise.all([Recruitment.findByIdAndUpdate(recruitmentId, {$inc: {views: 1}}, // Increment the views count by 1
            {new: true, lean: true} // Return the updated document and convert to plain JS object
        ), RecruitmentDetail.findOne({recruitmentId}).lean()]);
        if (!recruitment) {
            throw new Error(`Recruitment not found with id: ${recruitmentId}`);
        }
        if (!recruitmentDetail) {
            throw new Error(`RecruitmentDetail not found with recruitmentId: ${recruitmentId}`);
        }
        recruitment.content = recruitmentDetail.content;
        return recruitment
    } catch (e) {
        throw new Error('Error retrieving recruitment: ' + e.message);
    }
};


const updateRecruitment = async (id, data, file, account) => {
    try {
        const { content, images: oldImage } = data;

        let images;

        if (file) {
            images = await uploadSingleImageToCloudinary(file.path);
            images = images.secure_url; 
        } else {
            images = oldImage;
        }

        const [updatedRecruitment, updatedRecruitmentDetail] = await Promise.all([Recruitment.findByIdAndUpdate({_id: id}, {
            $set: {
                ...data,
                images,
                updatedBy: account.username
            }
        }, {new: true}), RecruitmentDetail.findOneAndUpdate({recruitmentId: id}, {
            $set: {
                content,
                updatedBy: account.username
            }
        }, {new: true}),]);

        if (!updatedRecruitment) {
            throw new Error('Recruitment not found');
        }

        if (!updatedRecruitmentDetail) {
            throw new Error('RecruitmentDetail not found');
        }

        return {updatedRecruitment, updatedRecruitmentDetail};
    } catch (err) {
        throw new Error(`Error updating recruitment: ${err.message}`);
    }
};


const updateRecruitmentDetail = async (data) => {
    const {id, newData} = data
    const updated = await RecruitmentDetail.findByIdAndUpdate(id, newData)
    if (!updated) {
        throw new Error('update fail')
    }
    return updated
}
const deleteRecruitment = async (id) => {
    const recruitment = await Recruitment.findById(id)
    if (!recruitment) {
        throw new Error('Not found recruitment')
    }
    if (recruitment) {
        RecruitmentDetail.deleteOne({recruitmentId: recruitment._id})
    }
    await recruitment.deleteOne()
    return true
}
const deleteRecruitmentDetail = async (id) => {
    const recruitmentDetail = await RecruitmentDetail.findByIdAndDelete(id)
    if (!recruitmentDetail) {
        throw new Error('Delete fail')
    }
    return true
}
const getTopViews = async () => {
    try {
        const recruitment = await Recruitment.find()
            .limit(8)
            .sort({views: -1});
        console.log(recruitment)
        return recruitment
    } catch (e) {
        throw e
    }
}
const getFeatured = async () => {
    try {
        const featured = await Recruitment.find({isFeatured: true}).limit(5).sort({createdAt: -1});
        return featured
    } catch (e) {
        throw e
    }
}
const searchRecruitment = async (searchTerm, page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const searchQuery = {
            $or: [
                {title: {$regex: searchTerm, $options: 'i'}},
                {summary: {$regex: searchTerm, $options: 'i'}}
            ]
        };
        const [recruitment, totalCount] = await Promise.all([Recruitment.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1}), Recruitment.countDocuments(searchQuery)]);
        const recruitmentIds = recruitment.map(item => item._id);
        const recruitmentDetails = await RecruitmentDetail.find({recruitmentId: {$in: recruitmentIds}});
        const fullRecruitmentResults = recruitment.map(recruitmentItem => {
            const detail = recruitmentDetails.find(detail => detail.recruitmentId.toString() === recruitmentItem._id.toString());
            return {
                ...recruitmentItem.toObject(), content: detail ? detail.content : null
            };
        });
        return {
            results: fullRecruitmentResults, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page
        };
    } catch (error) {
        console.error("Error searching recruitment:", error);
        throw new ApiErr(StatusCodes.INTERNAL_SERVER_ERROR, "Error searching recruitment");
    }
};


export const recruitmentService = {
    createRecruitment,
    createRecruitmentDetail,
    findAllRecruitment,
    deleteRecruitment,
    updateRecruitment,
    getRecruitmentByNId,
    getTopViews,
    getFeatured,
    searchRecruitment
}