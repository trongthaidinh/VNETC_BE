import {Router} from "express";
import isAuth from "~/middlewares/authMiddleware";
import {upload} from "~/middlewares/multipleUploadMiddleware";
import {addVideo, getVideo} from "~/modules/Video/videoController";
import {deleteImage, getImage} from "~/modules/Image/imageController";

const Video = Router();
Video.post("/", isAuth, addVideo)
Video.get("/", getVideo)
Video.delete("/:id", isAuth, deleteImage)
export const VideoLibraryRoute = Video;