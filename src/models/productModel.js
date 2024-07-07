import mongoose from "mongoose"
import { ObjectId } from "mongodb"
const { Schema } = mongoose

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category_id: {
      type: ObjectId,
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
)

export const Product = mongoose.model("Product", productSchema)
