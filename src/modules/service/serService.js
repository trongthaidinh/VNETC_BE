import {ServiceModel} from "~/models/serviceModel";
import {ServiceDetailModel} from "~/models/serviceDetailModel";
import ApiErr from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";

class SerService {
    async addService(data) {
        try {
            const service = new ServiceModel(data);
            await service.save();

            const newOrder = new ServiceDetailModel({
                serviceId: service._id,
                content: data.content,
                createdBy: data.createdBy
            });
            await newOrder.save();

            return [service, newOrder];
        } catch (e) {
            throw e;
        }
    }

    async getService({page, limit}) {
        try {
            const service = await ServiceModel.find().skip(limit * (page - 1)).limit(limit).sort({createdAt: -1})
            return service
        } catch (e) {
            throw e
        }
    }

    async deleteService(serviceId) {
        try {
            await ServiceDetailModel.deleteMany({serviceId: serviceId});
            const result = await ServiceModel.findByIdAndDelete(serviceId);
            if (!result) {
                throw new Error('Service not found');
            }

            return result;
        } catch (e) {
            throw e;
        }
    }

    async updateService(serviceId, data) {
        try {
            const service = await ServiceModel.findByIdAndUpdate(serviceId, data, {new: true});
            if (!service) {
                throw new Error('Service not found');
            }
            if (data.content || data.updatedBy) {
                await ServiceDetailModel.updateMany(
                    {serviceId: serviceId},
                    {
                        $set: {
                            ...(data.content && {content: data.content}),
                            ...(data.updatedBy && {updatedBy: data.updatedBy})
                        }
                    }
                );
            }

            return service;
        } catch (e) {
            throw e;
        }
    }

    async getServiceById(serviceId) {
        try {
            const service = await ServiceModel.findById(serviceId);
            if (!service) {
                throw new ApiErr(StatusCodes.BAD_REQUEST, "Service detail not found");
            }

            const serviceDetails = await ServiceDetailModel.findOne({serviceId: serviceId});
            if (!serviceDetails) {
                throw new ApiErr(StatusCodes.BAD_REQUEST, "Service details not found");
            }
            const data = {
                _id: service._id,
                name: service.name,
                createdBy: service.createdBy,
                updatedBy: service.updatedBy,
                createdAt: service.createdAt,
                updatedAt: service.updatedAt,
                content: serviceDetails.content // Ensure content is included
            };
            return data;
        } catch (e) {
            throw e;
        }
    }


}


const Service = new SerService()

export default Service