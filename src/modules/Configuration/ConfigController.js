import { config } from "dotenv"
import configService from "./ConfigService"
import { SuccessRes } from "~/utils/SuccessRes"
import ApiErr from "~/utils/ApiError"
config()

export const addConfigController = async (req, res, next) => {
  try {
    const data = req.body
    const file = req.files
    const created = await configService.addConfig(
      data,
      file,
      req.account.username
    )
    if (!created) {
      throw new ApiErr(444, "Create fail")
    }
    SuccessRes(res, created, "Create new config success")
  } catch (error) {
    next(error)
  }
}
export const getConfigById = async (req, res, next) => {}
export const getAllConfig = async (req, res, next) => {
  try {
    const products = await configService.getAll(req.query)
    SuccessRes(res, products, "Get all Config success")
  } catch (error) {}
}
