import {serviceService} from "./serviceService"

const {serviceModel} = require("~/models/serviceModel")
const {SuccessRes} = require("~/utils/SuccessRes")

const addService = async (req, res, next) => {
    try {
        const {body: data, file: image, account} = req
        const added = await serviceService.createService(data, image, account)
        SuccessRes(res, added, 'Add service succesfull')
    } catch (error) {
        next(error)
    }
}
const addServiceDetail = async (req, res, next) => {
    try {
        const added = await serviceService.createServiceDetail(req.body, req.account)
        SuccessRes(res, added, 'Add service detail successful')
    } catch (error) {
        next(error)
    }
}

const getService = async (req, res, next) => {
    try {
        const getService = await serviceService.findAllService(req.query)
        SuccessRes(res, getService, 'get service successful')
    } catch (error) {
        next(error)
    }
}
const getServicebyid = async (req, res, next) => {
    try {
        const getService = await serviceService.getServiceByNId(req.params.id)
        SuccessRes(res, getService, 'get service successful')
    } catch (error) {
        next(error)
    }
}
const deleteService = async (req, res, next) => {
    try {
        const deleteService = await serviceService.deleteService(req.params.id)
        SuccessRes(res, deleteService, 'Delete service successful')
    } catch (error) {
        next(error)
    }
}
const updateService = async (req, res, next) => {
    try {
        const update = await serviceService.updateService(req.params.id, req.body, req.file, req.account)
        SuccessRes(res, update, 'Updated successful')
    } catch (error) {
        next(error)
    }
}
const getTopViews = async (req, res, next) => {
    try {
        const result = await serviceService.getTopViews()
        SuccessRes(res, result, 'Get Top Views Successs')
    } catch (e) {
        next(e)
    }
}
const getFeatured = async (req, res, next) => {
    try {
        const result = await serviceService.getFeatured()
        SuccessRes(res, result, 'Get Featured Successs')
    } catch (e) {
        next(e)
    }
}
const search = async (req, res, next) => {
    try {
        const {data, page, limit} = req.query
        const result = await serviceService.searchService(data, page, limit)
        SuccessRes(res, result, 'Get Featured Successs')
    } catch (e) {
        next(e)
    }
}
export const serviceController = {
    addService,
    addServiceDetail,
    getService,
    getServicebyid,
    deleteService,
    updateService,
    getTopViews,
    getFeatured,
    search
}