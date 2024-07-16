import {Project} from "~/models/projectModel";
import {ServiceDetailModel} from "~/models/serviceDetailModel";
import ApiErr from "~/utils/ApiError";
import {StatusCodes} from "http-status-codes";
import uploadSingleImageToCloudinary from "~/utils/uploadSingleImage";
import {projectDetail} from "~/models/ProjectDetailModel";

class ProjectService {
    async addProject(data, file) {
        try {
            const uploadedImage = await uploadSingleImageToCloudinary(file.path);
            const project = new Project(data);
            project.image = uploadedImage.secure_url
            await project.save();

            const newProjectDetail = new projectDetail({
                projectId: project._id,
                content: data.content,
                createdBy: data.createdBy
            });
            await newProjectDetail.save();

            return [project, newProjectDetail];
        } catch (e) {
            throw e;
        }
    }

    async getProject({page, limit, type}) {
        try {
            const query = type ? {projectType: type} : {};
            return await Project.find(query).skip(limit * (page - 1)).limit(limit).sort({createdAt: -1})
        } catch (e) {
            throw e
        }
    }

    async deleteProject(projectId) {
        try {
            await projectDetail.deleteMany({projectId: projectId});
            const result = await Project.findByIdAndDelete(projectId);
            if (!result) {
                throw new Error('Service not found');
            }

            return result;
        } catch (e) {
            throw e;
        }
    }


    async updateProject(projectId, data, file) {
        try {
            // Handle file upload if present
            let imageUrl;
            if (file) {
                const uploadedImage = await uploadSingleImageToCloudinary(file.path);
                imageUrl = uploadedImage.secure_url;
            }

            // Add image URL to data if available
            if (imageUrl) {
                data.image = imageUrl;
            }
            console.log(data)
            // Update the project
            const project = await Project.findByIdAndUpdate(
                projectId,
                {$set: data},
                {new: true, runValidators: true}
            );

            if (!project) {
                throw new Error('Cannot find project');
            }

            // Update project details
            const projectDetailUpdateData = {
                content: data.content,
                updatedBy: data.updatedBy,
            };

            const updatedProjectDetail = await projectDetail.findOneAndUpdate(
                {projectId: project._id},
                {$set: projectDetailUpdateData},
                {new: true, upsert: true, runValidators: true}
            );

            return [project, updatedProjectDetail];
        } catch (e) {
            throw new Error(`Update failed: ${e.message}`);
        }
    }


    async getProjectById(projectId) {
        try {
            const project = await
                Project.findByIdAndUpdate(
                    {_id: projectId},
                    {$inc: {views: 1}},
                    {new: true, lean: true});
            if (!project) {
                throw new ApiErr(StatusCodes.BAD_REQUEST, "Service detail not found");
            }

            const projectDetails = await projectDetail.findOne({projectId: projectId});
            if (!projectDetails) {
                throw new ApiErr(StatusCodes.BAD_REQUEST, "Project details not found");
            }
            const data = {
                // _id: project._id,
                name: project.name,
                views: project.views,
                summary: project.summary,
                image: project.image,
                projectType: project.projectType,
                createdBy: project.createdBy,
                updatedBy: project.updatedBy,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,
                content: projectDetails.content // Ensure content is included
            };
            return data;
        } catch (e) {
            throw e;
        }
    }


    async getByTopViews() {
        try {
            const data = await Project.find()
                .limit(8)
                .sort({views: -1});
            return data
        } catch (e) {
            throw e
        }
    }

    //
    // async getFeatured() {
    //     try {
    //         return await ServiceModel.find({isFeatured: true}).limit(5).sort({createdAt: -1})
    //     } catch (e) {
    //         throw e
    //     }
    // }
}


const projectService = new ProjectService()

export default projectService