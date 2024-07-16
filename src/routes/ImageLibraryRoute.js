import {Router} from "express";
import isAuth from "~/middlewares/authMiddleware";
import {upload} from "~/middlewares/multipleUploadMiddleware";
import {addImage, getImage} from "~/modules/Image/imageController";

const Image = Router();

Image.post("/", upload.array("image"), addImage)
Image.get("/", getImage)
export const ImageLibratyRoute = Image;