import {Router} from "express";
import isAuth from "~/middlewares/authMiddleware";
import {upload} from "~/middlewares/multipleUploadMiddleware";
import {
    addProject,
    deleteProject, getByTopViews,
    getProject,
    getProjectById,
    updateProject
} from "~/modules/project/projectController";

const Project = Router();

Project.post("/",isAuth, upload.single("image"), addProject);
Project.get("/", getProject)
Project.get("/:id", getProjectById)
Project.patch("/:id",isAuth, upload.single("image"), updateProject)
Project.delete("/:id",isAuth, deleteProject)
Project.get("/views", getByTopViews)

export const ProjectRoute = Project;
