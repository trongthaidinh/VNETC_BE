import { SuccessRes } from "../../utils/SuccessRes.js"
import { memberService } from "./memberService.js"

const create = async (req,res,next) => {
    try {
        const created = await memberService.create(req.body,req.account.username)
        SuccessRes(res,created,'Create successful')
    } catch (error) {
        next(error)
    }
}

export const memberController ={
    create
}