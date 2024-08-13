import mongoose from "mongoose"
import {Category} from "./categoryModel"
import {Account, accountModel} from "./accountModel"

const {Schema} = mongoose

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    images: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
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

const serviceDetailSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
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


export const ServiceDetail = mongoose.model('ServiceDetail', serviceDetailSchema)
export const Service = mongoose.model('Service', serviceSchema)