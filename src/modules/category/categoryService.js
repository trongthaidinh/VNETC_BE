import { Category } from "~/models/categoryModel"
import { News } from "~/models/newsModel"
import uploadSingleImageToCloudinary from "~/utils/uploadSingleImage"
import slugify from "~/utils/stringToSlug"
import ApiErr from "~/utils/ApiError"
import mongoose from "mongoose";
import { response } from "express"

const addCategory = async (data, profile) => {
    const { name, type, image, subcategories } = data;
    const slug = slugify(name);

        const cateExists = await Category.exists({ name });
        if (cateExists) {
            throw new ApiErr(444, "Category already exists");
        }

        let uploadedImageUrl = null;
        if (data.image) {
            try {
                const result = await uploadSingleImageToCloudinary(data.image.path);
                uploadedImageUrl = result.secure_url;
            } catch (uploadError) {
                throw new ApiErr(500, "Image upload failed: " + uploadError.message);
            }
        }

        const category = new Category({
            name,
            slug,   
            type,
            image: uploadedImageUrl || null,
            createdBy: profile,
            subcategories: Array.isArray(subcategories) ? subcategories.map(subName => ({
                _id: new mongoose.Types.ObjectId(),
                name: subName,
                slug: slugify(subName)
            })) : []
        });

    await category.save()
    return category
}

const deleteCategory = async (id) => {
    try {
        const category = await Category.findById(id)
        if (!category) {
            throw new ApiErr(404, "Category not found")
        }

        if (await News.exists({ categoryId: category._id })) {
            throw new ApiErr(400, "Cannot delete category with associated news")
        }

        await category.deleteOne()
        return true
    } catch (error) {
        if (error instanceof ApiErr) throw error
        throw new ApiErr(500, "Error deleting category: " + error.message)
    }
}

const getCategories = async () => {
    try {
        return await Category.find()
    } catch (error) {
        throw new ApiErr(500, "Error fetching categories: " + error.message)
    }
}

const getCategoriesByType = async (type) => {
    try {
        return await Category.find({ type })
    } catch (error) {
        throw new ApiErr(500, "Error fetching categories by type: " + error.message)
    }
}
const getCategoryById = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiErr(400, `Invalid category ID format ${id}` );
        }
        const category = await Category.findById(id);
        if (!category) {
            throw new ApiErr(404, "Category not found");
        }
        return category;
    } catch (error) {
        throw new ApiErr(500, "Error fetching category by ID: " + error.message);
    }
};

const updateCategory = async (id, data, file, profile) => {
    const { name, type, image, subcategories } = data;
    let uploadedImageUrl = null;

    let parsedSubcategories = subcategories;
    if (typeof subcategories === 'string') {
        try {
            parsedSubcategories = JSON.parse(subcategories);
        } catch (parseError) {
            throw new ApiErr(400, "Invalid subcategories format. Must be a valid JSON array.");
        }
    }

    try {
        const updatedData = {
            updatedBy: profile,
        };

        if (name) {
            updatedData.name = name;
            updatedData.slug = slugify(name);
        }

        if (type) {
            updatedData.type = type;
        }

        if (file) {
            try {
                const result = await uploadSingleImageToCloudinary(file.path);
                uploadedImageUrl = result.secure_url;
                updatedData.image = uploadedImageUrl;
            } catch (uploadError) {
                throw new ApiErr(500, "Image upload failed: " + uploadError.message);
            }
        } else {
            updatedData.image = image;
        }

        if (Array.isArray(parsedSubcategories) && parsedSubcategories.length > 0) {
            updatedData.subcategories = parsedSubcategories.map(subName => ({
                _id: new mongoose.Types.ObjectId(),
                name: subName,
                slug: slugify(subName),
            }));
        }

        console.error("Updating category with data:", updatedData);

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            throw new ApiErr(404, "Category not found");
        }

        return updatedCategory;
    } catch (error) {
        console.error("Error updating category:", error);
        if (error instanceof ApiErr) throw error;
        throw new ApiErr(500, "Error updating category: " + error.message);
    }
};


export const categoryService = {
    addCategory,
    deleteCategory,
    updateCategory,
    getCategories,
    getCategoriesByType,
    getCategoryById
}