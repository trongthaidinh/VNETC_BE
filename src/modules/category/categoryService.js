import {Category, categoryModel} from "~/models/categoryModel"
import slugify from "~/utils/stringToSlug"

const {accountModel} = require("~/models/accountModel")

const addCategory = async (data, profile) => {
    console.log(data)
    console.log(profile)
    //data = {name, createdBy}
    // console.log(data)
    const {name, type} = data
    console.log('===============')
    console.log(`name :${name}, type :${type})`)
    console.log('===============')
    const slug = slugify(name)
    //
    const cateExists = await Category.exists({name})
    if (cateExists) {
        throw new Error('Category name is exist')
    }
    const category = new Category({name, slug, type})
    category.createdBy = profile
    console.log(category)
    await category.save()
    return category
}

export const categoryService = {
    addCategory,
}
