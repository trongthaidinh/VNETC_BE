import { StatusCodes } from "http-status-codes"
import { date } from "joi"
import { env } from "~/config/environment"
import { Account, accountModel } from "~/models/accountModel"
import ApiErr from "~/utils/ApiError"

const addAccount = async (data) => {
    const {accCreateId, user} = data
    const admin = await Account.findById(accCreateId)

    if (!admin) {
        throw new ApiErr(499,'Add account fail1')
    }else if (admin.email != env.ADMIN_EMAIL) {
        throw new ApiErr(499,'Add account fail2')
    }

    user.createdBy = admin.fullName

    const createdUser = await accountModel.addAccount(user)
    return createdUser
}
const deleteAccount = async (data) => {
    const {accDelId, id} = data
    const accDel = await Account.findById(accDelId)
    if (!accDel) {
        throw new ApiErr(StatusCodes.CONFLICT,'Delete fail')
    }else if (accDel.email != env.ADMIN_EMAIL) {
        throw new ApiErr(StatusCodes.CONFLICT,'Delete fail')
    }
    const deleted = await accountModel.deleteAccount(id)
    return deleted
}

//Auth
const login = async (data) => {
    const {email, password} = data
    const account = await Account.findOne({email},{})
    if (!account) {
        throw new ApiErr(StatusCodes.NOT_FOUND,'Not found account')
    }
    if (password != account.password) {
        throw new ApiErr(StatusCodes.CONFLICT,'Wrong password')
    }
    return account
}
const changePassword = async (data) => {
    const {accChangeId, email, oldPassword, newPassword} = data

    //check permission
    const accChange = await accountModel.getAccountById(accChangeId)
    if (email !== accChange.email) {
        throw new ApiErr(StatusCodes.NOT_FOUND,'KHông phải email của account này')
    }

    //check password
    if (accChange.password !== oldPassword) {
        throw new ApiErr(StatusCodes.CONFLICT,'Wrong password')
    }

    const channged = await accountModel.changePassword({accountId:accChangeId,newPassword})
    return channged
}


export const accountService = {
    addAccount,
    login,
    deleteAccount,
    changePassword
}