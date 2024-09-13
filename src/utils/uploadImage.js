import cloudinary from "../helper/cloundinary.js"

export const uploadImageToCloudinary = async (filePaths) => {
    try {
        const uploadPromises = filePaths.map((filePath) =>
            cloudinary.uploader.upload(filePath.path)
        );

        const uploadResults = await Promise.all(uploadPromises);
        return uploadResults.map(result => result.secure_url);
    } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }
};
