import { env } from "~/config/environment"
import { Account, accountModel } from "~/models/accountModel"
import ApiErr from "~/utils/ApiError"

const addAccount = async (data) => {
    const {id, user} = data
    const admin = await Account.findById(id)

    if (!admin) {
        throw new ApiErr(499,'Add account fail1')
    }else if (admin.email != env.ADMIN_EMAIL) {
        throw new ApiErr(499,'Add account fail2')
    }
    user.createdBy = admin.fullName

    const createdUser = await accountModel.addAccount(user)
    return createdUser
}

export const accountService = {
    addAccount
}