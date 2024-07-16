import {SuccessRes} from "~/utils/SuccessRes";
import ImageService from "~/modules/Image/ImageService";

export const addImage = async (req, res, next) => {
    try {
        const {files} = await req
        const result = await ImageService.addImage(files)
        SuccessRes(res, result, "Create Image success")
    } catch (error) {
        next(error)
    }
}