import {Router} from "express"
import isAuth from "~/middlewares/authMiddleware"
import {upload} from "~/middlewares/multipleUploadMiddleware"
import {
    addService,
    deleteService,
    getService,
    getServiceById,
    updateService
} from "~/modules/service/serviceController";

const Service = Router()
Service.post("/", addService)
Service.get("/", getService)
Service.get('/:id', getServiceById)
Service.patch('/:id', updateService)
Service.delete("/:id", deleteService)

export const ServiceRoute = Service