import cloudinary from "../../helper/cloundinary.js"
import { LibraryImage } from "../../models/libraryImageModel.js"
import { LibraryVideo } from "../../models/libraryVideoModel.js"
import ApiErr from "../../utils/ApiError.js"

const create = async (req, type, creator) => {
    let libPromise = new Promise((res, rej) => {
        cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                rej(err)
            }else{
                res(result)
            }
        })
    })

    await libPromise
        .then(async (result) => {
            let lib 
            if (type == 1) {//image
                lib = new LibraryImage({image:result.secure_url, createdBy:creator})
            }else{//video
                lib = new LibraryVideo({image:result.secure_url, createdBy:creator})
            }
            await lib.save()
            return lib
        })
        .catch(async (err) => {
            throw new ApiErr(444, 'Upload image fail')
        })
}
const getAll = async (type) => {
    let result
    if (type == 1) {//image
        result = await LibraryImage.find({},{image:1})
    }else{//video
        result = await LibraryVideo.find({},{video:1})
    }
    return result
}
const deleteById = async (type, id) => {
    let result
    if (type == 1) {//image
        result = await LibraryImage.findByIdAndDelete(id)
    }else{//video
        result = await LibraryVideo.findByIdAndDelete(id)
    }
    if (!result) {
        throw new ApiErr(444, 'Delete fail')
    }
    return
}

export const exampleService = {
    create,
    getAll,
    deleteById
}