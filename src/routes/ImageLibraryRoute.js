import {Router} from "express";
import isAuth from "~/middlewares/authMiddleware";
import {upload} from "~/middlewares/multipleUploadMiddleware";
import {addImage, deleteImage, getImage} from "~/modules/Image/imageController";
import {deleteViddeo, getVideo} from "~/modules/Video/videoController";

const Image = Router();

Image.post("/", isAuth, upload.array("image"), addImage)
Image.get("/", getVideo)
Image.delete("/:id", isAuth, deleteViddeo)
export const ImageLibraryRoute = Image;