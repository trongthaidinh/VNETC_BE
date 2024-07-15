import express from 'express'
import isAuth from '~/middlewares/authMiddleware'
import {departmentController} from '~/modules/department/departmentController'
import {upload} from "~/middlewares/multipleUploadMiddleware";

const Router = express.Router()

Router.route('/')
    .post(isAuth, departmentController.create)
    .get(departmentController.getAll)

Router.route('/:id')
    .post(upload.single('image'), departmentController.createMember)
    .delete(departmentController.deleteDepartment)
    .patch(departmentController.updateDepartment)
Router.route('/:id/members').get(departmentController.getMember)
Router.route('/:id/members/:memberId')
    .patch(upload.single('image'),departmentController.updateMember)  // Sửa thông tin thành viên
    .delete(departmentController.deleteMember) // Xóa thành viên
    .get(departmentController.getMemberById)
export const departmentRoute = Router