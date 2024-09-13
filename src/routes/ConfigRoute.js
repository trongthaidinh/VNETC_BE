import {Router} from "express"
import isAuth from "../middlewares/authMiddleware.js"
import {upload} from "../middlewares/multipleUploadMiddleware.js"
import {
    addConfigController,
    deleteConfig,
    getAllConfig,
    getConfigById, updateConfig,
} from "../modules/Configuration/ConfigController.js"

const Config = Router()

Config.post("/", isAuth, upload.array("image"), addConfigController)
Config.get("/", getAllConfig)
Config.get("/:id", getConfigById)
Config.delete("/:id", isAuth, deleteConfig)
Config.patch("/:id", isAuth, updateConfig)
export const ConfigRoute = Config
