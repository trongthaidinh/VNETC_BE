import { SuccessRes } from "~/utils/SuccessRes"
import { memberService } from "./memberService"

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