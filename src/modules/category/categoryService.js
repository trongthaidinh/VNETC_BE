import {Category, categoryModel} from "~/models/categoryModel"
import slugify from "~/utils/stringToSlug"
import ApiErr from "~/utils/ApiError";
import {News} from "~/models/newsModel";

const {accountModel} = require("~/models/accountModel")

const addCategory = async (data, profile) => {
    const {name, type} = data
    const slug = slugify(name)
    const cateExists = await Category.exists({name})
    if (cateExists) {
        throw new ApiErr(444, "Category already exists")
    }
    const category = new Category({name, slug, type})
    category.createdBy = profile
    await category.save()
    return category
}
const deleteCate = async (id) => {

    const cate = await Category.findById(id)
    if (!cate) {
        throw new Error('Category not found')
    }

    const newsExists = await News.exists({categoryId: cate._id.toString()})
    if (newsExists) {
        throw new Error('Lỗi khóa ngoại')
    }

    await Category.findByIdAndDelete(id)

    return true
}
const getCates = async () => {
    const cates = await Category.find()
    return cates
}
const getByType = async (value) => {
    const cates = await Category.find({type: value})
    return cates
}
const updateCate = async (data) => {
    const {id, name, updatedBy} = data

    const updated = await Category.findByIdAndUpdate(id, {name, updatedBy})

    if (!updated) {
        throw new Error('Update fail')
    }
    return updated
}

export const categoryService = {
    addCategory,
    deleteCate,
    updateCate,
    getCates,
    getByType
}
