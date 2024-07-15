import {Router} from "express"
import isAuth from "~/middlewares/authMiddleware"
import {upload} from "~/middlewares/multipleUploadMiddleware"
import {
    addService,
    deleteService, getByFeatured, getByTopViews,
    getService,
    getServiceById,
    updateService
} from "~/modules/service/serviceController";

const Service = Router()
Service.post("/", upload.single("image"), addService)
Service.get("/", getService)
Service.get("/views", getByTopViews)
Service.get("/featured", getByFeatured)
Service.get('/:id', getServiceById)
Service.patch('/:id', upload.single("image"), updateService)
Service.delete("/:id", deleteService)
export const ServiceRoute = Service