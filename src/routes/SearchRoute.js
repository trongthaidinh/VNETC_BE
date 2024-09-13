import {Router} from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {upload} from "../middlewares/multipleUploadMiddleware.js";

const Search = Router();

export const SearchRoute = Search;