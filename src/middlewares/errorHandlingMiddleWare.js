import { StatusCodes } from "http-status-codes"
import { ErrRes } from "../utils/ErrRes.js"

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleWare = (err, req, res, next) => {

  // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR


  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    status:false,
    statusCode:err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    // stack: err.stack
  }
  // console.error(responseError)

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(ErrRes(err.statusCode,err.message))
}





