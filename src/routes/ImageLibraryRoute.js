import {Router} from "express";
import isAuth from "~/middlewares/authMiddleware";
import {upload} from "~/middlewares/multipleUploadMiddleware";
import {addImage} from "~/modules/Image/imageController";

const Image = Router();

Image.post("/", upload.array("image"), addImage)

export const ImageLibratyRoute = Image;