import {navigationService} from "./navigationService"
import {SuccessRes} from "~/utils/SuccessRes"
import slugify from "~/utils/stringToSlug";

const getNavigation = async (req, res, next) => {
    try {
        const re = await navigationService.getAllNavigation()
        SuccessRes(res, re, "Get navigation succesful")
    } catch (error) {
        next(error)
    }
}

const getNaigationBySlug = async (req, res, next) => {
    try {
        const result = await navigationService.getNavigationBySlug(req.params.slug)
        SuccessRes(res, result, "Get navigation successful")
    } catch (error) {
        next(error)
    }
}

const addNavigation = async (req, res, next) => {
    try {
        const added = await navigationService.addNavigation(
            req.body,
            req.account.username,
        )
        SuccessRes(res, added, "Add navigation successful")
    } catch (error) {
        next(error)
    }
}
const updateNavigation = async (req, res, next) => {
    try {

        const added = await navigationService.updateNavigation(
            req.params.id,
            req.body,
            req.account.username,
        )
        SuccessRes(res, added, "Add navigation successful")
    } catch (error) {
        next(error)
    }
}
const deleteNavigation = async (req, res, next) => {
    try {
        const deleted = await navigationService.deleteNaigation(req.body)
        SuccessRes(res, deleted, "Delete successful")
    } catch (error) {
        next(error)
    }
}

const getNaigationById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await navigationService.getNaigationById(id)
        SuccessRes(res, result, "Get By ID Success")
    } catch (e) {
        next(e)
    }
}

export const navigationController = {
    getNavigation,
    getNaigationBySlug,
    addNavigation,
    deleteNavigation,
    getNaigationById,
    updateNavigation
}
