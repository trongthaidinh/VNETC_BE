import cloudinary from "../../helper/cloundinary.js"
import ApiErr from "../../utils/ApiError.js"
import { Partner } from "../../models/partnerModel.js"

const create = async (req, creator) => {
    let partnerPromise = new Promise((res, rej) => {
        cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                rej(err)
            }else{
                res(result)
            }
        })
    })

    await partnerPromise
        .then(async (result) => {
            const partner = new Partner({ logo: result.secure_url, createdBy: creator })
            await partner.save()
            return partner
        })
        .catch(async (err) => {
            throw new ApiErr(444, 'Upload image fail')
        })
}
const deleteById = async (id) => {
    try {
        const deleted = await Partner.findByIdAndDelete(id)
        if (!deleted) {
            throw new ApiErr(444, 'Delete fail')
        }
        return deleted
    } catch (error) {
        next(error)
    }
}
const getAll = async () => {
    try {
        const partners = await Partner.find({},{logo:1})
        return partners
    } catch (error) {
        next(error)
    }
}

export const partnerService = {
    create,
    deleteById,
    getAll
}