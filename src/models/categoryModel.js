import mongoose from "mongoose"
const { Schema } = mongoose

const categorySchema = new Schema({
    name:{
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

export const Category = mongoose.model('Category', categorySchema)