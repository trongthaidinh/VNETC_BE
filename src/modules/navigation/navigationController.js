import { StatusCodes } from "http-status-codes"
import { navigationService } from "./navigationService"
import { SuccessRes } from "~/utils/SuccessRes"
import { ParentNav, navigationModel } from "~/models/navigationModel"
import { NAVIGATION as NAV } from "~/utils/appConst"

const getNavigation = async (req, res, next) => {
  try {
    const childs = req.query.childs
    const re = await navigationModel.getNavigations(childs || 0)
    SuccessRes(res, re, "Get navigation succesful")
  } catch (error) {
    next(error)
  }
}

const getNaigationBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug
    console.log(slug)
    const result = await navigationModel.getNavigationBySlug(slug)
    SuccessRes(res, result, "Get navigation successful")
  } catch (error) {
    next(error)
  }
}

const addNavigation = async (req, res, next) => {
  try {
    const account_id = req.account._id
    const data = req.body

    const added = await navigationService.addNavigation(data, account_id)
    SuccessRes(res, added, "Add navigation successful")
  } catch (error) {
    next(error)
  }
}

const updateNavigation = async (req, res, next) => {
  try {
    const id = req.params.slug
    const updated = await navigationModel.updateNavigation(req.body, id)
    SuccessRes(res, updated, "Update succcessful")
  } catch (error) {
    next(error)
  }
}

const deleteNavigation = async (req, res, next) => {
  try {
    const deleted = await navigationModel.deleteNavigation(req.body)
    SuccessRes(res, deleted, "Delete successful")
  } catch (error) {
    next(error)
  }
}

export const navigationController = {
  getNavigation,
  getNaigationBySlug,
  updateNavigation,
  addNavigation,
  deleteNavigation,
}
