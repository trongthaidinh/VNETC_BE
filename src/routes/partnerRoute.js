import express from 'express'
import { upload } from '~/middlewares/multipleUploadMiddleware'
import { partnerController } from '~/modules/partner/partnerController'
const Router = express.Router()


Router.route('/:id')
    .delete(partnerController.deletePartner)

Router.route('/')
    .post(upload.single('image'), partnerController.addPartner)



export const partnerRoute = Router