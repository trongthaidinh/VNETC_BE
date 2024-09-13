import cloudinary from "../helper/cloundinary.js";

const uploadSingleImageToCloudinary = (filePath) => {
    console.log(filePath);
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export default uploadSingleImageToCloudinary;
