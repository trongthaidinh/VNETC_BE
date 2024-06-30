import { StatusCodes } from "http-status-codes"
import { env } from "~/config/environment"
import { jwtHelper } from "~/helper/jwtHelper"
import { Account } from "~/models/accountModel"
import ApiErr from "~/utils/ApiError"
import bcrypt from 'bcryptjs'

const login = async (email, password) => {
    const account = await Account.findOne({email},{})
    if (!account) {
        throw new ApiErr(StatusCodes.NOT_FOUND,'Not found account')
    }
    if (bcrypt.compareSync(password,account.password)) {
        throw new ApiErr(StatusCodes.CONFLICT,'Wrong password')
    }

    return await jwtHelper.generateToken(account, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_LIFE)
}

export const authService = {
    login
}