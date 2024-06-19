import { StatusCodes } from "http-status-codes"
import { navigationService } from "./navigationService"
import { SuccessRes } from "~/utils/SuccessRes"
import { ParentNav, navigationModel } from "~/models/navigationModel"
import { NAVIGATION as NAV } from "~/utils/appConst"

const getNavigation = async (req, res, next) => {
    try {
        const childs = req.query.childs
        const re = await navigationModel.getNavigations(childs || 0)
        res.status(200).json(re)
    } catch (error) {
        next(error)
    }
}

const getNaigationBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug
        const result = await navigationModel.getNavigationBySlug(slug)
        res.status(StatusCodes.OK).json(SuccessRes(result, 'Get navigation successful'))
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
        res.status(StatusCodes.OK).json(SuccessRes(added, 'Add navigation successful'))
    } catch (error) {
        next(error)
    }
}

const updateNavigation = (req, res, next) => {
    try {
        const accountId = req.query.accountId
        const { type, id, title } = req.body

        const updated = navigationModel.updateNavigation(req.body)
        res.status(200).json(updated)
    } catch (error) {
        next(error)
    }
}

const deleteNavigation = async (req, res, next) => {
    try {
        const deleted = await navigationModel.deleteNavigation(req.body)
        res.status(StatusCodes.OK).json(SuccessRes(deleted, 'Delete successful'))
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