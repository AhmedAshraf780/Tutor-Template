import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";
import authMiddleWare from "../../middleware/authMiddleWare.js";
import Student from "../../models/student.js";
import Admin from "../../models/admin.js";
import checkExpiration from "../../middleware/checkExpiration.js";

const router = express.Router();

router.get("/me", authMiddleWare, checkExpiration, async (req, res) => {
  try {
    const userId = req.session.userId;
    const isAdmin = req.session.isAdmin || false;

    let user;
    if (isAdmin) {
      user = await Admin.findOne({ id: userId });
    } else {
      user = await Student.findOne({ id: userId });
    }

    if (!user) {
      // If user is deleted but session exists, invalidate session
      return req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(401).json({
          success: false,
          message: "User not found, please log in again",
        });
      });
    }

    return res.status(200).json({
      success: true,
      logged: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin,
      },
    });
  } catch (err) {
    console.error("Error in /me:", err); // Use console.error for better logging
    return res.status(500).json({
      success: false,
      message: "Server internal error",
    });
  }
});
export default router;
