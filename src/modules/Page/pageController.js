import {SuccessRes} from "../../utils/SuccessRes.js";
import pageService from "../../modules/Page/pageService.js";

export const addPage = async (req, res, next) => {
    try {
        const {body: data, account} = req
        const result = await pageService.addPageService(data, account)
        SuccessRes(res, result, "Create Page success")
    } catch (error) {
        next(error)
    }
}
export const getPage = async (req, res, next) => {
    try {
        const result = await pageService.getPage()
        SuccessRes(res, result, "Get Page success")
    } catch (error) {
        next(error)
    }
}
export const getBySlug = async (req, res, next) => {
    try {
        const {slug} = req.params
        const result = await pageService.getBySlug(slug)
        SuccessRes(res, result, "Get By Slug Success")
    } catch (e) {
        next(e)
    }
}
export const deletePage = async (req, res, next) => {
    try {
        const {params: {slug}, account} = req
        const result = await pageService.deletePage(slug)
        SuccessRes(res, result, "Delete Page success")
    } catch (error) {
        next(error)
    }
}
export const updatePage = async (req, res, next) => {
    try {
        const {slug} = req.params;
        const {body: data, account} = req;
        const result = await pageService.updatePage(slug, data, account);
        SuccessRes(res, result, "Update Page Success");
    } catch (e) {
        next(e);
    }
};