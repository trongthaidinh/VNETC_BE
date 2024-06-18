import mongoose from "mongoose"
const { Schema } = mongoose

const serviceDetailSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    serviceId:{
        type:Schema.Types.ObjectId,
        ref:'Service'
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

export const ServiceDetail = mongoose.model('ServiceDetail', serviceDetailSchema)