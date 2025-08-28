import { configDotenv } from "dotenv";
configDotenv();

export const config = {
  PORT: process.env.PORT,
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDEER_ID: process.env.MESSAGING_SENDEER_ID,
  APP_ID: process.env.APP_ID,
  MEASUREMENT_ID: process.env.MEASUREMENT_ID,

  EMAIL_USER: process.env.EMAIL_USER,
  PASS_USER: process.env.PASS_USER,

  MONGO_URI: process.env.MONGO_URI,
  REDIS_NAME: process.env.REDIS_NAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  JWT_SECRET: process.env.JWT_SECRET,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

  SESSION_KEY: process.env.SESSION_KEY,
};
