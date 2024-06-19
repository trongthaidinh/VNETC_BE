import { categoryModel } from "~/models/categoryModel"
import slugify from "~/utils/stringToSlug"

const { accountModel } = require("~/models/accountModel")

const addCategory = async (data) => {
    const {name, accountId} = data
    const account = await accountModel.getAccountById(accountId, {fullName:1})
    const added = await categoryModel.createNew({name, createdBy:account.fullName})
    return added
}

export const categoryService = {
    addCategory
}