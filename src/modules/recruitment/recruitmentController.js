import {recruitmentService} from "./recruitmentService.js"

import { SuccessRes } from "../../utils/SuccessRes.js";

const addRecruitment = async (req, res, next) => {
    try {
        const {body: data, file: image, account} = req
        const added = await recruitmentService.createRecruitment(data, image, account)
        SuccessRes(res, added, 'Add recruitment succesfull')
    } catch (error) {
        next(error)
    }
}
const addRecruitmentDetail = async (req, res, next) => {
    try {
        const added = await recruitmentService.createRecruitmentDetail(req.body, req.account)
        SuccessRes(res, added, 'Add recruitment detail successful')
    } catch (error) {
        next(error)
    }
}

const getRecruitment = async (req, res, next) => {
    try {
        const getRecruitment = await recruitmentService.findAllRecruitment(req.query)
        SuccessRes(res, getRecruitment, 'get recruitment successful')
    } catch (error) {
        next(error)
    }
}
const getRecruitmentbyid = async (req, res, next) => {
    try {
        const getRecruitment = await recruitmentService.getRecruitmentByNId(req.params.id)
        SuccessRes(res, getRecruitment, 'get recruitment successful')
    } catch (error) {
        next(error)
    }
}
const deleteRecruitment = async (req, res, next) => {
    try {
        const deleteRecruitment = await recruitmentService.deleteRecruitment(req.params.id)
        SuccessRes(res, deleteRecruitment, 'Delete recruitment successful')
    } catch (error) {
        next(error)
    }
}
const updateRecruitment = async (req, res, next) => {
    try {
        const update = await recruitmentService.updateRecruitment(req.params.id, req.body, req.file, req.account)
        SuccessRes(res, update, 'Updated successful')
    } catch (error) {
        next(error)
    }
}
const getTopViews = async (req, res, next) => {
    try {
        const result = await recruitmentService.getTopViews()
        SuccessRes(res, result, 'Get Top Views Successs')
    } catch (e) {
        next(e)
    }
}
const getFeatured = async (req, res, next) => {
    try {
        const result = await recruitmentService.getFeatured()
        SuccessRes(res, result, 'Get Featured Successs')
    } catch (e) {
        next(e)
    }
}
const search = async (req, res, next) => {
    try {
        const {data, page, limit} = req.query
        const result = await recruitmentService.searchRecruitment(data, page, limit)
        SuccessRes(res, result, 'Get Featured Successs')
    } catch (e) {
        next(e)
    }
}
export const recruitmentController = {
    addRecruitment,
    addRecruitmentDetail,
    getRecruitment,
    getRecruitmentbyid,
    deleteRecruitment,
    updateRecruitment,
    getTopViews,
    getFeatured,
    search
}