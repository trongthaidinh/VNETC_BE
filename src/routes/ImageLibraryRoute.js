import {Router} from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/multipleUploadMiddleware.js";
import {addImage, deleteImage, getImage} from "../modules/Image/imageController.js";
import {deleteViddeo, getVideo} from "../modules/Video/videoController.js";

const Image = Router();

Image.post("/", isAuth, upload.array("image"), addImage)
Image.get("/", getImage)
Image.delete("/:id", isAuth, deleteImage)
export const ImageLibraryRoute = Image;