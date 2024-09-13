import uploadSingleImageToCloudinary from "../../utils/uploadSingleImage.js"
import ApiErr from "../../utils/ApiError.js";
import {StatusCodes} from "http-status-codes";

import {Category} from "../../models/categoryModel.js";
import {Service, ServiceDetail} from "../../models/serviceModel.js"

const findAllService = async (data) => {
    const {page, limit, categoryId} = data
    // const {page, limit} = data
    const query = categoryId ? {categoryId} : {};
    const service = await Service.find(query)
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({createdAt: -1});

    return service
}
const createService = async ({title, summary, views, categoryId, content, isFeatured}, image, account) => {
    try {
        const uploadImage = await uploadSingleImageToCloudinary(image.path);
        if (!uploadImage) throw new ApiErr(StatusCodes.BAD_REQUEST, "Upload Image fail");
        const images = uploadImage.secure_url;

        const [cateIdExist, findNew] = await Promise.all([Category.exists({_id: categoryId}), Service.exists({title}),]);

        if (findNew) throw new ApiErr(StatusCodes.BAD_REQUEST, "Service with this title already exists");
        if (!cateIdExist) throw new ApiErr(StatusCodes.BAD_REQUEST, "Category ID does not exist");

        const service = new Service({
            title, summary, views, images, categoryId, isFeatured, createdBy: account.username
        });
        const serviceDetail = new ServiceDetail({
            content, serviceId: service._id, createdBy: account.username
        });

        await service.save();
        await serviceDetail.save();

        return service;
    } catch (error) {
        throw error
    }
};


const createServiceDetail = async (data, account) => {
    const {content, serviceId} = data

    const serviceIdExists = await Service.exists({_id: serviceId})
    if (!serviceIdExists) {
        throw new Error('ServiceId is not exists')
    }


    const serviceDetail = new ServiceDetail({content, serviceId, createdBy: account.username})
    await serviceDetail.save()

    return serviceDetail
}

const getServiceByNId = async (serviceId) => {
    try {
        const [service, serviceDetail] = await Promise.all([Service.findByIdAndUpdate(serviceId, {$inc: {views: 1}}, // Increment the views count by 1
            {new: true, lean: true} // Return the updated document and convert to plain JS object
        ), ServiceDetail.findOne({serviceId}).lean()]);
        if (!service) {
            throw new Error(`Service not found with id: ${serviceId}`);
        }
        if (!serviceDetail) {
            throw new Error(`ServiceDetail not found with serviceId: ${serviceId}`);
        }
        service.content = serviceDetail.content;
        return service
    } catch (e) {
        throw new Error('Error retrieving service: ' + e.message);
    }
};


const updateService = async (id, data, file, account) => {
    try {
        const { content, images: oldImage } = data;

        let images;

        if (file) {
            images = await uploadSingleImageToCloudinary(file.path);
            images = images.secure_url; 
        } else {
            images = oldImage;
        }

        const [updatedService, updatedServiceDetail] = await Promise.all([
            Service.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        ...data,
                        images,
                        updatedBy: account.username,
                    },
                },
                { new: true }
            ),
            ServiceDetail.findOneAndUpdate(
                { serviceId: id },
                {
                    $set: {
                        content,
                        updatedBy: account.username,
                    },
                },
                { new: true }
            ),
        ]);

        if (!updatedService) {
            throw new Error('Service not found');
        }

        if (!updatedServiceDetail) {
            throw new Error('ServiceDetail not found');
        }

        return { updatedService, updatedServiceDetail };
    } catch (err) {
        throw new Error(`Error updating service: ${err.message}`);
    }
};



const updateServiceDetail = async (data) => {
    const {id, newData} = data
    const updated = await ServiceDetail.findByIdAndUpdate(id, newData)
    if (!updated) {
        throw new Error('update fail')
    }
    return updated
}
const deleteService = async (id) => {
    const service = await Service.findById(id)
    if (!service) {
        throw new Error('Not found service')
    }
    if (service) {
        ServiceDetail.deleteOne({serviceId: service._id})
    }
    await service.deleteOne()
    return true
}
const deleteServiceDetail = async (id) => {
    const serviceDetail = await ServiceDetail.findByIdAndDelete(id)
    if (!serviceDetail) {
        throw new Error('Delete fail')
    }
    return true
}
const getTopViews = async () => {
    try {
        const service = await Service.find()
            .limit(8)
            .sort({views: -1});
        console.log(service)
        return service
    } catch (e) {
        throw e
    }
}
const getFeatured = async () => {
    try {
        const featured = await Service.find({isFeatured: true}).limit(5).sort({createdAt: -1});
        return featured
    } catch (e) {
        throw e
    }
}
const searchService = async (searchTerm, page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const searchQuery = {
            $or: [
                {title: {$regex: searchTerm, $options: 'i'}},
                {summary: {$regex: searchTerm, $options: 'i'}}
            ]
        };
        const [service, totalCount] = await Promise.all([Service.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1}), Service.countDocuments(searchQuery)]);
        const serviceIds = service.map(item => item._id);
        const serviceDetails = await ServiceDetail.find({serviceId: {$in: serviceIds}});
        const fullServiceResults = service.map(serviceItem => {
            const detail = serviceDetails.find(detail => detail.serviceId.toString() === serviceItem._id.toString());
            return {
                ...serviceItem.toObject(), content: detail ? detail.content : null
            };
        });
        return {
            results: fullServiceResults, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page
        };
    } catch (error) {
        console.error("Error searching service:", error);
        throw new ApiErr(StatusCodes.INTERNAL_SERVER_ERROR, "Error searching service");
    }
};


export const serviceService = {
    createService,
    createServiceDetail,
    findAllService,
    deleteService,
    updateService,
    getServiceByNId,
    getTopViews,
    getFeatured,
    searchService
}