import mongoose from "mongoose";

const { Schema } = mongoose;

const parentNavSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        position: {  
            type: Number,
            required: false,
            unique: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const childNavSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        parentNavId: {
            type: Schema.ObjectId,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        position: {  
            type: Number,
            required: false,
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export const ParentNav = mongoose.model("ParentNav", parentNavSchema);
export const ChildNav = mongoose.model("ChildNav", childNavSchema);
