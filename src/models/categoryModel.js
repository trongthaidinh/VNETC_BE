import mongoose from "mongoose"
import {News} from "./newsModel"
import slugify from "~/utils/stringToSlug"
import {Cat_type} from "~/utils/appConst";

const {Schema} = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null,
    },
    type: {
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

export const Category = mongoose.model('Category', categorySchema)
