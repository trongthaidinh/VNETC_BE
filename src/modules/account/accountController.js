import { accountModel } from "~/models/accountModel"

const { StatusCodes } = require("http-status-codes")
const { SuccessRes } = require("~/utils/SuccessRes")
const { accountService } = require("./accountService")

const addAccount = async (req, res, next) => {
    const {accCreateId, username, fullName, email, password} = req.body
    try {
        const data = {
            accCreateId,
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

const deleteAccount = async (req,res,next) => {
    try {
        const deleted = await accountService.deleteAccount(req.body)
        res.status(StatusCodes.OK).json(SuccessRes(deleted,'Delete successful'))
    } catch (error) {
        next(error)
    }
}

const changePassword = async (req,res,next) => {
    try {
        const changed = await accountService.changePassword(req.body)
        res.status(StatusCodes.OK).json(SuccessRes(changed,'Change password successful'))
    } catch (error) {
        next(error)
    }
}

const updateAccount = async (req,res,next) => {
    try {
        
        const updated = await accountModel.updateAccount(req.body)
        delete updated.password
        res.status(StatusCodes.OK).json(SuccessRes(updated,'Update successful'))
    } catch (error) {
        next(error)
    }
}

export const accountController = {
    addAccount,
    deleteAccount,
    changePassword,
    updateAccount
}