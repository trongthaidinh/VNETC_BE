import mongoose from "mongoose"
const { Schema } = mongoose

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
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

export const Product = mongoose.model('Product', productSchema)