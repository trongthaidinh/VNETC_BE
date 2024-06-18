import express, { request } from 'express'
import { navigationController as controller } from '~/modules/navigation/navigationController'
const Router = express.Router()

//http://localhost:8686/navigation
Router.route('/')
    .post(controller.addNavigation)
    .get(controller.getNavigation)
    .delete(controller.deleteNavigation)
    .put(controller.updateNavigation)

export default Router