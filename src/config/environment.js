import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGODB_URI);

export const env = {
  //app
  PORT: process.env.PORT || 8686,
  
  //mongo
  MONGODB_URI: process.env.MONGODB_URI,
  
  //mailer
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  PASSWORD_ADMIN_EMAIL: process.env.PASSWORD_ADMIN_EMAIL,

  //cloundinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,

  //jwt
  ACCESS_TOKEN_SECRET :process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,

  //otp
  OTP_TIMEOUT :process.env.OTP_TIMEOUT,

  //role
  ADMIN_ROLE: process.env.ADMIN_ROLE
}