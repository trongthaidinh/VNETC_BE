import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import ApiErr from "~/utils/ApiError"
import { NAVIGATION as NAV } from "~/utils/appConst"
const { Schema } = mongoose

const parentNavSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

const childNavSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parentNavId: {
      type: Schema.ObjectId,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export const ChildNav = mongoose.model("ChildNav", childNavSchema)
export const ParentNav = mongoose.model("ParentNav", parentNavSchema)

const addNavigation = async (data) => {
  const { type, newData } = data
  console.log(type)
  let nav

  try {
    if (type == NAV.PARENT) {
      const navExists = await ParentNav.exists({ title: newData.title })
      if (navExists) {
        throw new Error()
      }

      //xử lý trùng slug

      nav = new ParentNav(newData)
    } else {
      const navExists = await ChildNav.exists({ title: newData.title })
      const parentNavExist = await ParentNav.findById(newData.parentNavId)
      if (!parentNavExist || navExists) {
        throw new Error()
      }
      nav = new ChildNav(newData)
    }
  } catch (error) {
    throw new ApiErr(StatusCodes.NOT_FOUND, "Add fail")
  }

  await nav.save()
  return nav
}

const getNavigations = async (childs) => {
  let parentNavs = await ParentNav.find({}, { title: 1 })

  if (childs == 0) {
    let childNavs = await ChildNav.find({}, { title: 1, parentNavId: 1 })
    parentNavs.forEach((p, index) => {
      let childs = []
      childNavs.forEach((c) => {
        if (p._id.toString() == c.parentNavId.toString()) {
          childs.push(c)
        }
      })
      parentNavs[index] = { ...parentNavs[index]._doc, childs }
    })
  }

  return parentNavs
}

const getNavigationBySlug = async (slug) => {
  const parentNav = await ParentNav.findOne({ slug }, { title: 1 })
  console.log("vaoday1")
  const childNavs = await ChildNav.find(
    { parentNavId: parentNav._id.toString() },
    { title: 1 }
  )
  console.log("vaoday")
  parentNav._doc.childs = childNavs
  return parentNav
}

const deleteNavigation = async (data) => {
  const { type, id } = data
  try {
    let deleted
    if (type == NAV.CHILD) {
      deleted = await ChildNav.findByIdAndDelete({ _id: id })
    } else {
      const childNavsExists = await ChildNav.exists({ parentNavId: id })
      if (childNavsExists) {
        throw new ApiErr(444, "Please delete all child navigation first")
      }
      deleted = await ParentNav.findByIdAndDelete({ _id: id })
    }
    if (!deleted) {
      throw new ApiErr(StatusCodes.NOT_FOUND, "Not found navigation")
    }
    return true
  } catch (error) {
    throw new ApiErr(444, "Delete fail")
  }
}

const updateNavigation = async (data, navid) => {
  const { type, title } = data

  try {
    if (type == NAV.CHILD) {
      console.log("1")
      //check childNav exists
      const childNav = await ChildNav.findById(navid)

      if (!childNav) {
        throw new ApiErr(StatusCodes.NOT_FOUND, "Not found navigation")
      }
      //check title exist
      const childNavs = await ChildNav.find({
        title,
        parentNavId: childNav.parentNavId,
      })
      if (childNavs.length > 0) {
        throw new ApiErr(StatusCodes.CONFLICT, "Title is exists")
      }

      childNav.title = title
      await childNav.save()
    } else {
      console.log("2")
      const updateParentNav = await ParentNav.findByIdAndUpdate(navid, {
        title,
      })
      if (!updateParentNav) {
        throw new ApiErr(StatusCodes.NOT_FOUND, "Not found navigation")
      }
    }
    return true
  } catch (error) {
    throw new ApiErr(444, "Update fail")
  }
}

export const navigationModel = {
  addNavigation,
  getNavigations,
  getNavigationBySlug,
  deleteNavigation,
  updateNavigation,
}
