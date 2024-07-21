import cloudinary from "~/helper/cloundinary"

const uploadSingleImageToCloudinary = (filePath) => {
    console.log(filePath)
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

// const path = require('path');
// const fs = require('fs');
// const { UPLOAD_VIDEO_DIR } = require('./config'); // Assuming this is defined elsewhere
//
// const handleUploadVideo = async (req) => {
//     const formidable = (await import('formidable')).default;
//     const { nanoid } = await import('nanoid');
//
//     const idName = nanoid();
//     const folderPath = path.resolve(UPLOAD_VIDEO_DIR, idName);
//     fs.mkdirSync(folderPath);
//
//     const form = formidable({
//         uploadDir: folderPath,
//         maxFiles: 1,
//         maxFileSize: 50 * 1024 * 1024, // 50MB
//         filter: function ({ name, originalFilename, mimetype }) {
//             const valid = name === 'video' && Boolean(mimetype?.includes('mp4') || mimetype?.includes('quicktime'));
//             if (!valid) {
//                 form.emit('error', new Error('File type is not valid'));
//             }
//             return valid;
//         },
//         filename: function () {
//             return idName;
//         }
//     });
//
//     return new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 return reject(err);
//             }
//             if (!Boolean(files.video)) {
//                 return reject(new Error('File is empty'));
//             }
//             const videos = files.video;
//             videos.forEach((video) => {
//                 const ext = getExtension(video.originalFilename);
//                 fs.renameSync(video.filepath, video.filepath + '.' + ext);
//                 video.newFilename = video.newFilename + '.' + ext;
//                 video.filepath = video.filepath + '.' + ext;
//             });
//             resolve(files.video);
//         });
//     });
// };
//
// // Assuming this function is defined elsewhere in your code
// function getExtension(filename) {
//     return filename.split('.').pop();
// }
//
// module.exports = handleUploadVideo;
module.exports = uploadSingleImageToCloudinary
