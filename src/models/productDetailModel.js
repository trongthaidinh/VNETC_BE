import mongoose from "mongoose"
const { Schema } = mongoose

const productDetailSchema = new Schema({
    brand:String,
    wattage:Number,
    species:String,
    weight:Number,
    size:String,
    warranty:Number,
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)