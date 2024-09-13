import nodeMailer from 'nodemailer'
import { env } from '../config/environment.js'


const adminEmail = env.ADMIN_EMAIL
const adminPassword = env.PASSWORD_ADMIN_EMAIL
// Mình sử dụng host của google - gmail
const mailHost = 'smtp.mailersend.net'
// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587

export const sendMail = (to, subject, htmlContent) => {
  // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu dùng port 587, để false
    auth: {
      user: adminEmail,
      pass: adminPassword
    },
    tls: {
      rejectUnauthorized: false // Bỏ qua kiểm tra chứng chỉ tự ký
    }
  });
  

  const options = {
    from: adminEmail, // địa chỉ admin email bạn dùng để gửi
    to: to, // địa chỉ gửi đến
    subject: subject, // Tiêu đề của mail
    html: htmlContent // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  }

  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  return transporter.sendMail(options)
}