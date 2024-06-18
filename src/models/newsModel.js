import mongoose from "mongoose"
const { Schema } = mongoose

const newsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Category'
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

export const News = mongoose.model('News', newsSchema)