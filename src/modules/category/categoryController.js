import { StatusCodes } from "http-status-codes"
import { categoryService } from "./categoryService"
import { SuccessRes } from "~/utils/SuccessRes"

const addCategory = async (req, res, next) => {
    try {
        const added = await categoryService.addCategory(req.body)
        res.status(StatusCodes.OK).json(SuccessRes(added, 'Add category success'))
    } catch (error) {
        next(error)
    }
}

export const categoryController = {
    addCategory
}