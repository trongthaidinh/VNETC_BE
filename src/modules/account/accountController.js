import { accountModel } from "~/models/accountModel"

const { StatusCodes } = require("http-status-codes")
const { SuccessRes } = require("~/utils/SuccessRes")
const { accountService } = require("./accountService")

const getAllAccount = async (req, res, next) => {
    try {
        const accounts = await accountModel.getAllAccount()
        SuccessRes(res, accounts, 'Get all account successful')
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const created = await accountService.create(req.body,req.account.username)
        SuccessRes(res, created, 'Add account successful')
    } catch (error) {
        next(error)
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const deleted = await accountService.deleteAccount(req.body)
        SuccessRes(res, deleted, 'Delete successful')
    } catch (error) {
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const changed = await accountService.changePassword(req.body)
        SuccessRes(res,changed, 'Change password successful')
    } catch (error) {
        next(error)
    }
}

const updateAccount = async (req, res, next) => {
    try {

        const updated = await accountModel.updateAccount(req.body)
        delete updated.password
        SuccessRes(res,updated, 'Update successful')
    } catch (error) {
        next(error)
    }
}
export const accountController = {
    create,
    deleteAccount,
    changePassword,
    updateAccount,
    getAllAccount
}