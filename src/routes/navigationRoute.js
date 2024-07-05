import express, { request } from "express"
import isAuth from "~/middlewares/authMiddleware"
import { navigationController as controller } from "~/modules/navigation/navigationController"
const Router = express.Router()

//http://localhost:8686/navigation
Router.route("/")
  .get(controller.getNavigation)
  .post(isAuth, controller.addNavigation)
  .delete(controller.deleteNavigation)
  .put(controller.updateNavigation)

Router.route("/:slug")
  .get(controller.getNaigationBySlug)
  .put(controller.updateNavigation)

export const navigationRoute = Router
