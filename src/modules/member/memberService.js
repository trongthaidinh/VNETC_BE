import { StatusCodes } from "http-status-codes"
import { Department } from "../../models/departentModel.js"
import { Member } from "../../models/memberModel.js"
import ApiErr from "../../utils/ApiError.js"

const create = async (data, creator) => {
    const departmentExists = await Department.exists({_id: data.departmentId})
    if (!departmentExists) {
        throw new ApiErr(StatusCodes.CONFLICT,'Department is not exists')
    }
    const member = new Member(data)
    member.createdBy = creator
    await member.save()
    return member
}
const getByDeparmentId = async (data, creator) => {
   
}
const getALl = async (data, creator) => {
    
}



export const memberService ={
    create
}