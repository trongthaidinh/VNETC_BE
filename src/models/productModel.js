import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.Mixed,
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
    summary: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, 
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
