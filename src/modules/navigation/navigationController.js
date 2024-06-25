import { StatusCodes } from "http-status-codes"
import { navigationService } from "./navigationService"
import { SuccessRes } from "~/utils/SuccessRes"
import { ParentNav, navigationModel } from "~/models/navigationModel"
import { NAVIGATION as NAV } from "~/utils/appConst"

const getNavigation = async (req, res, next) => {
    try {
        const childs = req.query.childs
        const re = await navigationModel.getNavigations(childs || 0)
        SuccessRes(res, re, 'Get navigation succesful')
    } catch (error) {
        next(error)
    }
}

const getNaigationBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug
        const result = await navigationModel.getNavigationBySlug(slug)
        SuccessRes(res,result, 'Get navigation successful')
    } catch (error) {
        next(error)
    }
}

const addNavigation = async (req, res, next) => {
    try {
        const { accountId, type } = req.body
        const newData = req.body
        delete newData.accountId
        delete newData.type
        const data = {
            type,
            accountId,
            newData
        }

        const added = await navigationService.addNaigation(data)
        SuccessRes(res,added, 'Add navigation successful')
    } catch (error) {
        next(error)
    }
}

const updateNavigation = (req, res, next) => {
    try {
        const accountId = req.query.accountId
        const { type, id, title } = req.body

        const updated = navigationModel.updateNavigation(req.body)
        SuccessRes(res, updated,'Update succcessful')
    } catch (error) {
        next(error)
    }
}

const deleteNavigation = async (req, res, next) => {
    try {
        const deleted = await navigationModel.deleteNavigation(req.body)
        SuccessRes(res,deleted, 'Delete successful')
    } catch (error) {
        next(error)
    }
}

export const navigationController = {
    getNavigation,
    getNaigationBySlug,
    updateNavigation,
    addNavigation,
    deleteNavigation
}