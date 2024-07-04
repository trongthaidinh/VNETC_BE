import { Router } from "express"
import isAuth from "~/middlewares/authMiddleware"
import { upload } from "~/middlewares/multipleUploadMiddleware"
import {
  addConfigController,
  getAllConfig,
  getConfigById,
} from "~/modules/Configuration/ConfigController"
const Config = Router()

Config.post("/", isAuth, upload.array("image"), addConfigController)
Config.get("/", getAllConfig)
Config.get("/:id", getConfigById)

export const ConfigRoute = Config
