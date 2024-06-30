import ApiErr from "~/utils/ApiError"
import { departmentService } from "./departmentService"
import { SuccessRes } from "~/utils/SuccessRes"

const create = async (req, res, next) =>{
    try {
        const created = await departmentService.create(req.body,req.account.username)
        if (!created) {
            throw new ApiErr(444,'Create fail')
        }
        SuccessRes(res,created,'Creat successful!')
    } catch (error) {
        next(error)
    }
}
const getAll = async (req, res, next) =>{
    try {
        const deparments = await departmentService.getAll()
        SuccessRes(res,deparments,'Get departments successful!')
    } catch (error) {
        next(error)
    }
}

export const deparmentController = {
    create,
    getAll
}