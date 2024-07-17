import {Router} from "express";
import isAuth from "~/middlewares/authMiddleware";
import {upload} from "~/middlewares/multipleUploadMiddleware";
import {addImage, deleteImage, getImage} from "~/modules/Image/imageController";

const Image = Router();

Image.post("/", isAuth , upload.array("image"), addImage)
Image.get("/", getImage)
Image.delete("/:id", isAuth, deleteImage)
export const ImageLibratyRoute = Image;