const { StatusCodes } = require("http-status-codes")
const { accountModel } = require("~/models/accountModel")
const { SuccessRes } = require("~/utils/SuccessRes")
const { accountService } = require("./accountService")

const addAccount = async (req, res, next) => {
    const {id, username, fullName, email, password} = req.body
    try {
        const data = {
            id,
            user:{
                username,
                fullName,
                email,
                password
            }
        }
        const added = await accountService.addAccount(data)
        res.status(StatusCodes.OK).json(SuccessRes(added,'Add account successful'))
    } catch (error) {
        next(error)
    }
}

export const accountController = {
    addAccount
}