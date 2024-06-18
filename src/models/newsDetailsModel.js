import mongoose from "mongoose"
const { Schema } = mongoose

const newsDetailSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    newsId:{
        type:Schema.Types.ObjectId,
        ref:'News'
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

export const NewsDetail = mongoose.model('NewsDetail', newsDetailSchema)