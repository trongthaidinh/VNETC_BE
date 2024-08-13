import { StatusCodes } from "http-status-codes"
import { categoryService } from "./categoryService"
import { SuccessRes } from "~/utils/SuccessRes"
import { categoryModel } from "~/models/categoryModel"

const addCategory = async (req, res, next) => {
    try {
        const { name, type } = req.body;

        if (!name || !type) {
            throw new ApiErr(400, "Name and type are required.");
        }

        const profile = req.account; 
        const added = await categoryService.addCategory({
            name,
            type,
            image: req.file, 
        }, profile);
        SuccessRes(res, added, 'Add category successful');
    } catch (error) {
        next(error);
    }
};

const getCates = async (req, res, next) => {
    try {
        const cates = await categoryService.getCates()
        SuccessRes(res, cates, 'Get categories successful')
    } catch (error) {
        next(error)
    }
}
const getByType = async (req, res, next) => {
    try {
        const {value} = req.query
        const result = await categoryService.getByType(value)
        SuccessRes(res, result, 'Get categories successful')
    }catch (e) {
        next(e)
    }
}
const deleteCate = async (req, res, next) => {
    try {
        const deleted = await categoryService.deleteCate(req.params.id)
        SuccessRes(res,deleted,'Deleted successful')
    } catch (error) {
        next(error)
    }
}

export const categoryController = {
    addCategory,
    getCates,
    deleteCate,
    getByType,
}