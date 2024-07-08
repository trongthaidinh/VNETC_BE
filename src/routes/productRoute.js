import express from "express"
import isAuth from "~/middlewares/authMiddleware"
import {upload} from "~/middlewares/multipleUploadMiddleware"
import {productController as controll} from "~/modules/product/productController"

const Router = express.Router()

Router.route("/")
    .post(isAuth, upload.single("image"), controll.create)
    .get(isAuth, controll.getAll)
Router.route("/:id")
    .get(isAuth, controll.getProductById)
    .patch(isAuth, upload.single("updateImage"), controll.updateProduct)

Router.route("/:id/detail")
    .post(isAuth, controll.createNewsDetail)
    .get(isAuth, controll.getAllProductDetail)


export const productRoute = Router
