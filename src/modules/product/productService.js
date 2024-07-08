import {StatusCodes} from "http-status-codes"
import cloudinary from "~/helper/cloundinary"
import {ProductDetail} from "~/models/productDetailModel"
import ApiErr from "~/utils/ApiError"
import {ObjectId} from "mongodb"
import uploadImageToCloudinary from "~/utils/uploadImage"

const {Product} = require("~/models/productModel")

const create = async (req, creator) => {
    try {
        const uploadImage = await uploadImageToCloudinary(req.file.path);
        const productData = {
            ...req.body,
            image: uploadImage.secure_url,
            category_id: new ObjectId(req.body.categoryID),
            createdBy: creator
        };
        const product = new Product(productData);
        await product.save();
        const productDetailData = {
            ...req.body,
            createdBy: creator,
            productId: product.id
        };
        const productDetail = new ProductDetail(productDetailData);
        await productDetail.save();

        return product;
    } catch (error) {
        console.error("Error creating product:", error.message);
        throw new ApiErr(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating product");
    }
};


const getAll = async (query) => {
    const {page = 0, limit = 8} = query
    const products = await Product.find()
        .skip(page * limit)
        .limit(limit)
    return products
}

const updateProduct = async (id, accountId, data, imageData) => {
    try {
        const {updateName: name, updateCate: category_id} = data;
        const {secure_url: image} = await uploadImageToCloudinary(imageData.path);
        const productData = {
            name,
            updatedBy: accountId,
            image,
            category_id
        };
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            productData,
            {new: true, runValidators: true}
        );
        if (!updatedProduct) throw new ApiErr(StatusCodes.UNAUTHORIZED, "UPDATE FAIL")
        return updatedProduct;
    } catch (error) {
        throw new ApiErr(StatusCodes.NOT_ACCEPTABLE, "Error updating product")
    }
};


const getProductById = async (id) => {
    const product = await Product.findById(id)
    const productDetail = await ProductDetail.findOne({productId: id})
    if (!product && !productDetail) {
        throw new ApiErr(StatusCodes.NOT_FOUND, "Not found product")
    }
    const result = {
        id: product.id,
        name: product.name,
        image: product.image,
        brand: productDetail.brand,
        wattage: productDetail.wattage,
        species: productDetail.species,
        weight: productDetail.weight,
        size: productDetail.size,
        warranty: productDetail.warranty,
    }
    return result
}

export const productService = {
    create,
    getAll,
    getProductById,
    updateProduct
}
