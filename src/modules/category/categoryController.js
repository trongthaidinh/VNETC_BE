import { categoryService } from "./categoryService.js"
import { SuccessRes } from "../../utils/SuccessRes.js"
import ApiErr from "../../utils/ApiError.js"


const addCategory = async (req, res, next) => {
    try {
        const { name, type, subcategories } = req.body;

        if (!name || !type) {
            throw new ApiErr(400, "Name and type are required.");
        }

        const profile = req.account; 
        const added = await categoryService.addCategory({
            name,
            type,
            subcategories,
            image: req.file, 
        }, profile);
        SuccessRes(res, added, 'Add category successful');
    } catch (error) {
        next(error);
    }
};
const getCates = async (req, res, next) => {
    try {
        const cates = await categoryService.getCategories()
        SuccessRes(res, cates, 'Get categories successful')
    } catch (error) {
        next(error)
    }
}
const updateCate = async (req, res, next) => {
    try {
        console.error(req.body);
        const id = req.params.id
        const data = req.body
        const profile = req.account
        const file = req.file
        const result = await categoryService.updateCategory(id, data, file, profile)
        SuccessRes(res, result, 'Update Categories Successfully')
    }catch (error) {
        next(error)
    }
}
const getByType = async (req, res, next) => {
    try {
        const {value} = req.query
        const result = await categoryService.getCategoriesByType(value)
        SuccessRes(res, result, 'Get categories successful')
    }catch (e) {
        next(e)
    }
}
const getCateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const category = await categoryService.getCategoryById(id);
        SuccessRes(res, category, 'Get category successful');
    } catch (error) {
        next(error);
    }
};
const deleteCate = async (req, res, next) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.id)
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
    updateCate,
    getCateById
}