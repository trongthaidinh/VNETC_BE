import mongoose from "mongoose"
const { Schema } = mongoose

const libraryImageSchema = new Schema({
    image:{
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

export const LibraryImage = mongoose.model('LibraryImage', libraryImageSchema)