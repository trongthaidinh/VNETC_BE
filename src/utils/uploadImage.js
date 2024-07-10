import cloudinary from "~/helper/cloundinary"

// const uploadImageToCloudinary = (filePath) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(filePath, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };
const uploadImageToCloudinary = (files) => {
    return Promise.all(files.map(file =>
        new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.secure_url);
                }
            });
        })
    ));
};
module.exports = uploadImageToCloudinary;