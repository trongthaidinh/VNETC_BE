import express from 'express'
import isAuth from '~/middlewares/authMiddleware'
import {deparmentController} from '~/modules/department/departmentController'
import {upload} from "~/middlewares/multipleUploadMiddleware";

const Router = express.Router()

Router.route('/')
    .post(isAuth, deparmentController.create)
    .get(deparmentController.getAll)

Router.route('/:id').post(upload.single('image'),deparmentController.createMember)
    .delete(deparmentController.deleteDepartment)
export const departmentRoute = Router