import express, {Router} from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {
    addNotification,
    deleteNotiById,
    getNotiById,
    getNotification
} from "../modules/Notification/NotificationController.js";

const Notification = express.Router()

Notification.post("/", addNotification)
Notification.get("/", getNotification)
Notification.get("/:id", getNotiById)
Notification.delete("/:id", deleteNotiById)
export const notiRoute = Notification