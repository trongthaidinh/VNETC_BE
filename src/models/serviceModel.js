import mongoose from "mongoose"

const {Schema} = mongoose

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
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

export const ServiceModel = mongoose.model('Service', serviceSchema)