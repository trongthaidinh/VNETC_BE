import mongoose from "mongoose"
const { Schema } = mongoose

const departmentSchema = new Schema({
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
        default: null
    },
}, { timestamps: true })

export const Department = mongoose.model('Department', departmentSchema)