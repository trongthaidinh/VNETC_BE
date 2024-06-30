import { SuccessRes } from "~/utils/SuccessRes"
import { partnerService } from "./partnerService"

const create = async (req, res, next) => {
    try {
        const created = await partnerService.create(req, req.account.username)
        SuccessRes(res, created, 'Add partner successful')
    } catch (error) {
        next(error)
    }
}
const deleteById = async (req, res, next) => {
    try {
        const deleted = await partnerService.deleteById(req.params.id)
        SuccessRes(res, deleted, 'Delete partner successful')
    } catch (error) {
        next(error)
    }
}
const getAll = async (req, res, next) => {
    try {
        const geted = await partnerService.getAll()
        SuccessRes(res, geted, 'Delete partner successful')
    } catch (error) {
        next(error)
    }
}

export const partnerController = {
    create,
    deleteById,
    getAll
}