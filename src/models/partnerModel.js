import mongoose from "mongoose"
const { Schema } = mongoose

const partnerSchema = new Schema({
    logo:{
        type:String,
        required:true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        default: null
    },
}, { timestamps: true })

export const Partner = mongoose.model('Partner', partnerSchema)