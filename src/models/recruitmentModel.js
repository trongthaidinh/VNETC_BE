import mongoose from "mongoose"

const {Schema} = mongoose

const recruitmentSchema = new Schema({
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

const recruitmentDetailSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    recruitmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Recruitment'
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


export const RecruitmentDetail = mongoose.model('RecruitmentDetail', recruitmentDetailSchema)
export const Recruitment = mongoose.model('Recruitment', recruitmentSchema)
