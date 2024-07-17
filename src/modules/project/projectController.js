import ApiErr from "~/utils/ApiError";
import {SuccessRes} from "~/utils/SuccessRes";

import projectService from "~/modules/project/projectService";
import {Project} from "~/models/projectModel";

export const addProject = async (req, res, next) => {
    try {
        const {body: data, file, account} = await req
        const result = await projectService.addProject(data, file)
        SuccessRes(res, result, "Create new Service success")
    } catch (error) {
        next(error)
    }
}
export const getProject = async (req, res, next) => {
    try {
        const data = req.query
        const result = await projectService.getProject(data)
        SuccessRes(res, result, "Get Project success")
    } catch (error) {
        next(error)
    }
}
export const getProjectById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await projectService.getProjectById(id)
        SuccessRes(res, result, "Get Project by id success")
    } catch (e) {
        next(e)
    }
}
export const updateProject = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const file = req.file
        const result = await projectService.updateProject(id, data,file)
        SuccessRes(res, result, "Update Project success")
    } catch (e) {
        next(e)
    }
}
export const deleteProject = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await projectService.deleteProject(id)
        SuccessRes(res, result, "Delete Project success")
    } catch (e) {
        next(e)
    }
}
export const getByTopViews = async (req, res, next) => {
    try {
        const result = await projectService.getByTopViews()
        SuccessRes(res, result, "Get by Top Views Success")
    } catch (e) {
        next(e)
    }
}
// export const getByFeatured = async (req, res, next) => {
//     try {
//         const result = await Service.getFeatured()
//         SuccessRes(res, result, 'Get Featured Successs')
//     } catch (e) {
//         next(e)
//     }
// }