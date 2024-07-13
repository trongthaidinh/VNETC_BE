import {StatusCodes} from "http-status-codes";
import {Member} from "~/models/memberModel";
import {Category} from "~/models/categoryModel";
import {accountService} from "~/modules/account/accountService";
import {News} from "~/models/newsModel";

const {Department} = require("~/models/departentModel")
const uploadSingleImageToCloudinary = require("~/utils/uploadSingleImage")
const create = async (data, creator) => {
    const department = new Department(data)
    department.createdBy = creator
    await department.save()
    return department
}

const getAll = async () => {
    const departments = await Department.find()
    return departments
}
const createMember = async (id, data, file) => {
    try {
        if (!file) throw new ApiErr(StatusCodes.BAD_REQUEST, 'Cannot find Image')
        const uploadImage = await uploadSingleImageToCloudinary(file.path)
        if (!uploadImage) throw new ApiErr(StatusCodes.BAD_REQUEST, 'Cannot Upload Image')

        const member = new Member(data)
        member.image = uploadImage.secure_url
        member.departmentId = id
        member.createdBy = 'admin'

        await member.save()
        return member
    } catch (e) {
        throw e
    }
}
const deleteDepartment = async (id) => {
    try {
        const result = await Promise.all([
            Department.findOneAndDelete({_id: id}),
            Member.deleteMany({departmentId: id})
        ]);
        if (!result) throw new ApiErr(StatusCodes.BAD_REQUEST, 'Cannot find Department and Member')
        return result
    } catch (e) {
        throw e
    }
}

export const departmentService = {
    create,
    getAll,
    createMember,
    deleteDepartment
}