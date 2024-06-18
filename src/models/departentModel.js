import mongoose from "mongoose"
const { Schema } = mongoose

const departmentSchema = new Schema({
    username:{
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

export const Department = mongoose.model('Department', departmentSchema)