import express from "express";
import isAuth from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multipleUploadMiddleware.js";
import { productController as control } from "../modules/product/productController.js";

const Router = express.Router();

Router.route("/")
    .post(isAuth, upload.array("images"), control.create)
    .get(control.getAll);

Router.route("/search").get(control.searchProductsController);

Router.route("/:id")
    .get(control.getProductById)
    .patch(isAuth, upload.array("updateImage"), control.updateProduct)
    .delete(isAuth, control.deleteProduct);

Router.route("/slug/:slug")
    .get(control.getProductBySlug);

export const productRoute = Router;
