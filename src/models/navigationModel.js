import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import ApiErr from '~/utils/ApiError'
import { NAVIGATION as NAV } from '~/utils/appConst'
const { Schema } = mongoose

const parentNavSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
}, { timestamps: true })

const childNavSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    parentNavId: {
        type: Schema.ObjectId,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
}, { timestamps: true })

export const ChildNav = mongoose.model('ChildNav', childNavSchema)
export const ParentNav = mongoose.model('ParentNav', parentNavSchema)

const addNaigation = async (data) => {
    const { type, newData } = data
    let nav

    try {
        if (type == NAV.PARENT) {
            const navExists = await ParentNav.exists({ title: newData.title })
            if (navExists) {
                throw new Error()
            }
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
        throw new ApiErr(StatusCodes.NOT_FOUND, 'Add fail')
    }

    await nav.save()
    return nav
}

const getAllNavigations = async () => {
    let parentNavs = await ParentNav.find({}, { title: 1 })
    let childNavs = await ChildNav.find({}, { title: 1, parentNavId: 1 })

    parentNavs.forEach((p, index) => {
        let childs = []
        childNavs.forEach(c => {
            if (p._id.toString() == c.parentNavId.toString()) {
                childs.push(c)
            }
        });
        parentNavs[index] = { ...parentNavs[index]._doc, childs }
    });

    return parentNavs
}

const getNavigation = async (data) => {
    const { childs, parentNavId } = data

    let result
    if (childs == 0) {
        result = await ParentNav.find({}, { title: 1 })
        return result
    }
    result = await ChildNav.find({ parentNavId }, { title: 1, parentNavId: 1 })
    return result
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
                throw new ApiErr(444, 'Please delete all child navigation first')
            }
            deleted = await ParentNav.findByIdAndDelete({ _id: id })
        }
        if (!deleted) {
            throw new ApiErr(StatusCodes.NOT_FOUND, 'Not found navigation')
        }
        return true
    } catch (error) {
        throw new ApiErr(444, 'Delete fail')
    }
}

const updateNavigation = async (data) => {
    const { type, id, title } = data
    try {
        if (type == NAV.CHILD) {
            //check childNav exists
            const childNav = await ChildNav.findById(id)
            if (!childNav) {
                throw new ApiErr(StatusCodes.NOT_FOUND, 'Not found navigation')
            }

            //check title exist
            const childNavs = await ChildNav.find({title,parentNavId:childNav.parentNavId})
            if (childNavs.length > 0) {
                throw new ApiErr(StatusCodes.CONFLICT, 'Title is exists')
            }

            childNav.title = title
            await childNav.save()
            
        } else {
            const updateParentNav = await ChildNav.findByIdAndUpdate(id,{title})
            if (!updateParentNav) {
                throw new ApiErr(StatusCodes.NOT_FOUND, 'Not found navigation')
            }
        }
        return true
    } catch (error) {
        throw new ApiErr(444, 'Delete fail')
    }
}

export const navigationModel = {
    addNaigation,
    getAllNavigations,
    getNavigation,
    deleteNavigation,
    updateNavigation
}