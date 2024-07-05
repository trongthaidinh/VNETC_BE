import { StatusCodes } from "http-status-codes"
import { Account } from "~/models/accountModel"
import { navigationModel } from "~/models/navigationModel"
import ApiErr from "~/utils/ApiError"
import { NAVIGATION as NAV } from "~/utils/appConst"
import slugify from "~/utils/stringToSlug"

const getAllNavigation = async (data) => {
  const parentNavs = await ParentNav.find({}, { title: 1 })
  const childNavs = await ChildNav.find({}, { title: 1, parentNavId: 1 })

  parentNavs = parentNavs._doc
  childNavs = childNavs._doc

  parentNavs = parentNavs.map((parent) => {
    childNavs.forEach((child) => {
      let childs = []
      if (parent._id.toString() == child.parentNavId.toString()) {
        childs.push(child)
      }
      return { ...parent, childs }
    })
  })

  return parentNavs
}

const getNaigation = async (data) => {
  let navs
  if (type == PARENT) {
    navs = ParentNav.find({}, { title: 1 })
  } else {
    navs = ChildNav.find(
      { parentNavId: data.parentNavId },
      { title: 1, parentNavId: 1 }
    )
  }
  return navs
}

const addNavigation = async (data, accountId) => {
  const account = await Account.findById(accountId)
  if (!account) {
    throw new ApiErr(StatusCodes.NOT_FOUND, "Add fail")
  }

  data.createdBy = account.fullName
  data.slug = slugify(data.title)
  console.log(data)
  const newNav = await navigationModel.addNavigation({ data })
  return newNav
}

const updateNaigation = async (data) => {}

const deleteNaigation = async (data) => {}

export const navigationService = {
  getAllNavigation,
  getNaigation,
  addNavigation,
  deleteNaigation,
  updateNaigation,
}
