import cloudinary from "~/helper/cloundinary"
import ApiErr from "~/utils/ApiError"

const { accountModel } = require("~/models/accountModel")
const { accountService } = require("../account/accountService")
const { Partner } = require("~/models/partnerModel")

const addPartner = async (req) => {
    const { accCreateId } = req.body

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
            const account = await accountService.findById(accCreateId, { username: 1 })
            const partner = new Partner({ logo: result.secure_url, createdBy: account.username })
            await partner.save()
            return partner
        })
        .catch(async (err) => {
            throw new ApiErr(444, 'Upload image fail')
        })
}
const deletePartner = async (id) => {
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

export const partnerService = {
    addPartner,
    deletePartner
}