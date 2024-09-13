import {Router} from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/multipleUploadMiddleware.js";
import {addVideo, deleteViddeo, getVideo} from "../modules/Video/videoController.js";

const Video = Router();
Video.post("/", isAuth, addVideo)
Video.get("/", getVideo)
Video.delete("/:id", isAuth, deleteViddeo)
export const VideoLibraryRoute = Video;