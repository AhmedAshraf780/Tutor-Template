import nodemailer from "nodemailer";
import { config } from "./config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail", // Or your email service (e.g., 'outlook', 'yahoo')
  auth: {
    user: config.EMAIL_USER, // Your email address
    pass: config.PASS_USER, // Your email password or app password
  },
});
