import { StatusCodes } from "http-status-codes"
import cloudinary from "~/helper/cloundinary"
import { ProductDetail } from "~/models/productDetailModel"
import ApiErr from "~/utils/ApiError"

const { Product } = require("~/models/productModel")

const create = async (req, creator) => {
  let uploadImage = new Promise((res, rej) => {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        rej(err)
      } else {
        res(result)
      }
    })
  })

  await uploadImage
    .then(async (result) => {
      const product = new Product(req.body)
      product.image = result.secure_url
      product.createdBy = creator
      await product.save()

      const productDetail = new ProductDetail(req.body)
      productDetail.createdBy = creator
      productDetail.productId = product.id
      await productDetail.save()
      return product
    })
    .catch(async (err) => {
      console.log(err)
      throw new ApiErr(444, "Create fail")
    })
}

const getAll = async (query) => {
  const { page = 0, limit = 8 } = query
  const products = await Product.find()
    .skip(page * limit)
    .limit(limit)
  return products
}

const getProductById = async (id) => {
  const product = await Product.findById(id)
  const productDetail = await ProductDetail.findOne({ productId: id })
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
}
