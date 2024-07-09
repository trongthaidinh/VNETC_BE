import ApiErr from "~/utils/ApiError"
import isAuth from "~/middlewares/authMiddleware";

const {SuccessRes} = require("~/utils/SuccessRes")
const {productService} = require("./productService")

const create = async (req, res, next) => {
    try {
        const created = await productService.create(req, "admin")//req.account.username
        if (!created) {
            throw new ApiErr(444, "Create fail")
        }
        SuccessRes(res, created, "Create new product success")
    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const products = await productService.getAll(req.query)
        SuccessRes(res, products, "Get all product success")
    } catch (error) {
        next(error)
    }
}
const getProductById = async (req, res, next) => {
    try {
        const products = await productService.getProductById(req.params.id)
        SuccessRes(res, products, "Get all product success")
    } catch (error) {
        next(error)
    }
}
const updateProduct = async (req, res, next) => {
    try {
        // const {username: accountName} = req.account;
        const {body: data, params: {id}, file: imageData} = req;
        const product = await productService.updateProduct(id, "admin", data, imageData);
        SuccessRes(res, product, "Update product success");
    } catch (error) {
        next(error);
    }
}

// const deleteById = async (req, res, next) => {
//   try {
//
//   }catch (e) {
//
//   }
// }
const createNewsDetail = async (req, res, next) => {
    try {
        // const {username: accountName} = req.account;
        const {body: data, params: {id}} = req;
        const product = await productService.createProductDetail(id, "admin", data);
        SuccessRes(res, product, "Create product detail success");
    } catch (error) {
        next(error);
    }
}

// const getAllProductDetail = async (req, res, next) => {
//     try {
//
//     }catch (error) {
//         next(error);
//     }
// }
const updateProductDetail = async (req, res, next) => {
    try {
        const {body: data, params: {productId}} = req //, account: user
        const product = await productService.updateProductDetail(productId, data, "admin");
        SuccessRes(res, product, "Update product detail success");
    } catch (error) {
        next(error);
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productService.deleteProduct(id)
        SuccessRes(res, product, "Delete product success");
    } catch (error) {
        next(error);
    }
}
export const productController = {
    create,
    getAll,
    getProductById,
    updateProduct,
    createNewsDetail,
    updateProductDetail,
    deleteProduct
    // getAllProductDetail
}
