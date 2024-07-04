import express, { request } from "express"
import { navigationController as controller } from "~/modules/navigation/navigationController"
const Router = express.Router()

//http://localhost:8686/navigation
Router.route("/")
  .get(controller.getNavigation)
  .post(controller.addNavigation)
  .delete(controller.deleteNavigation)
  .put(controller.updateNavigation)

Router.route("/:slug").get(controller.getNaigationBySlug)

export const navigationRoute = Router
