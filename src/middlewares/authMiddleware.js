import { env } from "~/config/environment"
import { jwtHelper } from "~/helper/jwtHelper"

let isAuth = async (req, res, next) => {
  let tokenFromClient = req.header("Authorization")
  if (tokenFromClient) {
    const tokens = tokenFromClient.split(" ")
    if (tokens.length > 1) {
      tokenFromClient = tokens
      tokenFromClient = tokens[1]
    }
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const account = await jwtHelper.verifyToken(
        tokenFromClient,
        env.ACCESS_TOKEN_SECRET
      )
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.account = account.data
      // Cho phép req đi tiếp sang controller.
      next()
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res.status(401).json({
        message: "Unauthorized.",
      })
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: "No token provided.",
    })
  }
}

export default isAuth
