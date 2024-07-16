import uploadImageToCloudinary from "~/utils/uploadImage";
import {LibraryImage} from "~/models/libraryImageModel";

class ImageService {
    async addImage(files) {
        const uploadedImages = await uploadImageToCloudinary(files);

        const savedImages = await Promise.all(uploadedImages.map(async (imageUrl) => {
            const image = new LibraryImage({image: imageUrl});
            image.createdBy = 'admin';
            return await image.save();
        }));

        return savedImages;
    }
}

const imageService = new ImageService();

export default imageService;