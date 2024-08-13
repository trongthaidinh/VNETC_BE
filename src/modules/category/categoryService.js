import { Category } from "~/models/categoryModel";
import slugify from "~/utils/stringToSlug";
import ApiErr from "~/utils/ApiError";
import { News } from "~/models/newsModel";
import uploadSingleImageToCloudinary from "~/utils/uploadSingleImage"

const addCategory = async (data, profile) => {
    const { name, type } = data;
    const slug = slugify(name);

    const cateExists = await Category.exists({ name });
    if (cateExists) {
        throw new ApiErr(444, "Category already exists");
    }

    let uploadedImageUrl = null;
    if (data.image) {
        try {
            const result = await uploadSingleImageToCloudinary(data.image.path); // Sử dụng đường dẫn tệp hình ảnh
            uploadedImageUrl = result.secure_url; // Lấy URL của hình ảnh đã upload
        } catch (uploadError) {
            throw new ApiErr(500, "Image upload failed: " + uploadError.message);
        }
    }

    // Tạo danh mục mới với URL hình ảnh
    const category = new Category({
        name,
        slug,
        type,
        image: uploadedImageUrl || null, // Sử dụng URL hình ảnh đã upload hoặc null
        createdBy: profile, // Thêm thông tin người tạo
    });

    // Lưu danh mục vào cơ sở dữ liệu
    await category.save();
    return category; // Trả về danh mục đã tạo
};

// Các hàm khác (deleteCate, getCates, getByType, updateCate) không thay đổi
const deleteCate = async (id) => {
    const cate = await Category.findById(id);
    if (!cate) {
        throw new Error('Category not found');
    }

    const newsExists = await News.exists({ categoryId: cate._id.toString() });
    if (newsExists) {
        throw new Error('Lỗi khóa ngoại');
    }

    await Category.findByIdAndDelete(id);
    return true;
};

const getCates = async () => {
    const cates = await Category.find();
    return cates;
};

const getByType = async (value) => {
    const cates = await Category.find({ type: value });
    return cates;
};

const updateCate = async (data) => {
    const { id, name, updatedBy } = data;

    const updated = await Category.findByIdAndUpdate(id, { name, updatedBy });

    if (!updated) {
        throw new Error('Update fail');
    }
    return updated;
};

export const categoryService = {
    addCategory,
    deleteCate,
    updateCate,
    getCates,
    getByType,
};
