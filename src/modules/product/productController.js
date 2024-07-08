import ApiErr from "~/utils/ApiError"

const {SuccessRes} = require("~/utils/SuccessRes")
const {productService} = require("./productService")

const create = async (req, res, next) => {
    try {
        const created = await productService.create(req, req.account.username)
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
        const {_id: accountID} = req.account;
        const {body: data, params: {id}, file: imageData} = req;
        const product = await productService.updateProduct(id, accountID, data, imageData);
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
export const productController = {
    create,
    getAll,
    getProductById,
    updateProduct
}
