import express from "express"
import isAuth from "~/middlewares/authMiddleware"
import {upload} from "~/middlewares/multipleUploadMiddleware"
import {productController as control} from "~/modules/product/productController"

const Router = express.Router()

Router.route("/")
    .post(isAuth, upload.single("image"), control.create)
    .get(isAuth, control.getAll)
Router.route("/:id")
    .get(isAuth, control.getProductById)
    .patch(isAuth, upload.single("updateImage"), control.updateProduct)
    .delete(isAuth, control.deleteProduct)

Router.route("/:id/detail")
    .post(isAuth, control.createNewsDetail)
    // .get(isAuth, control.getAllProductDetail)

Router.route("/:id/detail/:productId")
    .patch(isAuth, control.updateProductDetail)

export const productRoute = Router
