import {populate} from "dotenv"
import mongoose from "mongoose"

const {Schema} = mongoose

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        enum: [0, 1],
        default: 1,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        default: null
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

export const Member = mongoose.model('Member', memberSchema)