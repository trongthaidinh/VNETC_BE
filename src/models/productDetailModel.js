import mongoose from "mongoose"

const {Schema} = mongoose

const productDetailSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    content: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        required: true,
        unique: true, 
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
}, {timestamps: true})

export const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)