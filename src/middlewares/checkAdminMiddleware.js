import { StatusCodes } from "http-status-codes"
import { env } from "~/config/environment"
import { Role } from "~/models/roleModel"
import ApiErr from "~/utils/ApiError"
import ErrRes from "~/utils/ErrRes"

const checkAdminMiddleware = async (req, res, next) => {
    try {
        const { adminRoleID } = req.body
        let role
        try {
            role = await Role.findById(adminRoleID)

            if (role.name != env.ADMIN_ROLE) {
                throw new Error()
            }
        } catch (error) {
            throw new ApiErr(StatusCodes.CONFLICT, 'Role không hợp lệ!')
        }
        
        next()
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ErrRes(error.statusCode, error.message))
    }
}

export default checkAdminMiddleware