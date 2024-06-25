import { SuccessRes } from "~/utils/SuccessRes"
import { partnerService } from "./partnerService"

const { default: cloudinary } = require("~/helper/cloundinary")

const addPartner = async (req, res, next) => {
    try {
        const added = await partnerService.addPartner(req)
        SuccessRes(res, added, 'Add partner successful')
    } catch (error) {
        next(error)
    }
}
const deletePartner = async (req, res, next) => {
    try {
        const deleted = await partnerService.deletePartner(req.params.id)
        SuccessRes(res, deleted, 'Delete partner successful')
    } catch (error) {
        next(error)
    }
}

export const partnerController = {
    addPartner,
    deletePartner
}