import { StatusCodes } from "http-status-codes"
import { categoryService } from "./categoryService"
import { SuccessRes } from "~/utils/SuccessRes"
import { categoryModel } from "~/models/categoryModel"

const addCategory = async (req, res, next) => {
    try {
        const profile = req.account
        const added = await categoryService.addCategory(req.body,profile)
        SuccessRes(res, added, 'Add categor successful')
    } catch (error) {
        next(error)
    }
}
const getCates = async (req, res, next) => {
    try {
        const cates = await categoryModel.getCates()
        SuccessRes(res, cates, 'Get categories successful')
    } catch (error) {
        next(error)
    }
}
const deleteCate = async (req, res, next) => {
    try {
        const deleted = await categoryModel.deleteCate(req.params.id)
        SuccessRes(res,deleted,'Deleted successful')
    } catch (error) {
        next(error)
    }
}

export const categoryController = {
    addCategory,
    getCates,
    deleteCate
}