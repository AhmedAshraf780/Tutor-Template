import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";

const router = express.Router();

router.get("/admin/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(402).json({
        success: false,
        message: "UnAuthenticated access..",
      });
    }

    const user = jwt.verify(token, config.JWT_SECRET);
    if (!user.isAdmin) {
      return res.status(402).json({
        success: true,
        message: "Access Denied..",
      });
    }

    return res.status(200).json({
      sucess: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

export default router;
