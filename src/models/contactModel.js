import mongoose from "mongoose"
const { Schema } = mongoose

const contactSchema = new Schema({
    name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    phone:{
        type:String,
        default:null
    },
    title:{
        type:String,
        default:null
    },
    content:{
        type:String,
    },
    // createdBy: {
    //     type: String,
    //     required: true
    // },
    // updatedBy: {
    //     type: String,
    //     default: null
    // },
}, { timestamps: true })

export const Contact = mongoose.model('Contact', contactSchema)