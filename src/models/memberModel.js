import { populate } from "dotenv"
import mongoose from "mongoose"
const { Schema } = mongoose

const memberSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        default:null
    },
    images:{
        type:String,
        default:null
    },
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:'Department',
        default:null
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

export const Member = mongoose.model('Member', memberSchema)