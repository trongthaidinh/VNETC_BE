import {Router} from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/multipleUploadMiddleware.js";
import {addPage, deletePage, getBySlug, getPage, updatePage} from "../modules/Page/pageController.js";

const Page = Router();
Page.post("/", isAuth, addPage)
Page.get("/", getPage)
Page.patch("/:slug", isAuth, updatePage)
Page.get("/:slug",getBySlug)
Page.delete("/:slug", isAuth, deletePage)
export const PageRoute = Page;