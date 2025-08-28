import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import winston from "winston";
import { generateOTP, sendOTPEmail } from "../../utils/OTP.js";
import { getRedisClient, connectRedis } from "../../utils/connectRedis.js";
import Student from "../../models/student.js";
import Admin from "../../models/admin.js";
import { config } from "../../config/config.js";
import { v4 } from "uuid";
import checkAdminEmail from "../../middleware/checkAdmin.js";
import sendRestorePasswordEmail from "../../utils/restorePassword.js";
import authMiddleWare from "../../middleware/authMiddleWare.js";

const router = express.Router();

/*
 *    Sign up will send an otp message for this email and get the result
 * */
await connectRedis();
const client = getRedisClient();

router.post("/signup", async (req, res) => {
  const { name, email, password, age, grade, place, address, phone } = req.body;
  try {
    const existed = await Student.findOne({ email });
    // verify that student doesn't exist in mongodb
    if (existed || email === config.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Account Already Exists",
      });
    }
    // send otp to this student email
    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    const sessionId = v4();

    // cache the student data so we create a student when otp verified
    await client.set(
      sessionId,
      JSON.stringify(
        {
          otp,
          name,
          email,
          password,
          age,
          grade,
          place,
          address,
          phone,
        },
        { EX: 300 }
      )
    );
    return res.status(200).json({
      success: true,
      message: "OTP Sent successfully...",
      sessionId,
    });
  } catch (err) {
    winston.log(err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong, please try again",
    });
  }
});

router.post("/auth/verifyOTP", async (req, res) => {
  const { otp, sessionId } = req.body;
  try {
    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Time out, Signup Again",
      });
    }
    const user = JSON.parse(await client.get(sessionId));
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Time out, Signup Again",
      });
    }
    const validOtp = user.otp === otp;
    if (!validOtp) {
      console.log(user.otp, otp);
      return res.status(401).json({
        success: false,
        message: "OTP is not correct , Try again",
      });
    }
    const studentId = v4();
    // let's hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newStudent = new Student({
      id: studentId,
      ...user,
      password: hashedPassword,
    });
    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student Created successfully..",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong , Try Again Later",
    });
  }
});

router.post("/auth/resendOTP", async (req, res) => {
  const { sessionId } = req.body;
  try {
    const user = JSON.parse(await client.get(sessionId));
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Time out , please signup again",
      });
    }

    const otp = generateOTP();
    user.otp = otp;
    await sendOTPEmail(user.email, otp);
    await client.set(sessionId, JSON.stringify(user), { EX: 300 });
    return res.status(200).json({
      success: true,
      message: "Resend OTP successfully..",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Someting Went Wrong, please try again later",
    });
  }
});
/*-------------------------------------------------------------------------------------------------------
 *                                            End OF SIGNUP
 * **
 * -------------------------------------------------------------------------------------------------------
 * /
 *
 
/*-------------------------------------------------------------------------------------------------------
 *                                            Sign in with forgotpassword 
 * 
 *-------------------------------------------------------------------------------------------------------
 **/

router.post("/signin", checkAdminEmail, async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let user;
  try {
    if (req.isAdmin) {
      user = await Admin.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "This Account doesn't exist",
        });
      }
      let validPassword = password === config.ADMIN_PASSWORD;
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Password is not correct",
        });
      }
    } else {
      user = await Student.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "This Account doesn't exist",
        });
      }
      // valid the password
      let validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Password is not correct",
        });
      }
    }

    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to create session",
        });
      }

      req.session.userId = user.id;
      req.session.isAdmin = req.isAdmin || false;
      req.session.createdAt = Date.now();

      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({
            success: false,
            message: "Failed to save session",
          });
        }

        return res.status(200).json({
          success: true,
          message: `${
            req.isAdmin ? "Admin" : "Student"
          } logged in successfully`,
          user: {
            id: user.id,
            email: user.email,
            isAdmin: req.isAdmin || false,
          },
        });
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Server Internal Error ${err}`,
    });
  }
});

router.post("/auth/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    // check if we have this email
    const existed = await Student.findOne({ email });
    if (!existed) {
      return res.status(401).json({
        success: false,
        message: "This Email is not even existed",
      });
    }

    // create sessionId
    const sessionId = v4();
    await client.set(sessionId, JSON.stringify(email), { EX: 300 });

    await sendRestorePasswordEmail(email, sessionId, "http://localhost:5173");
    return res.status(200).json({
      success: true,
      message: "Verification sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Server Internal Error ${err}`,
    });
  }
});

router.get("/auth/checksessionid/:id", async (req, res) => {
  try {
    const sessionId = req.params.id;
    const rawData = await client.get(sessionId);

    if (!rawData) {
      return res.status(404).json({ valid: false });
    }

    const data = JSON.parse(rawData);

    return res.status(200).json({ valid: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `Server Internal Error: ${err.message}`,
    });
  }
});

router.post("/auth/resetpassword", async (req, res) => {
  const { password, sessionId } = req.body;

  try {
    const email = JSON.parse(await client.get(sessionId));
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Time out, this link is expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Student.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Invalidate reset link
    await client.del(sessionId);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `Server Internal Error: ${err.message}`,
    });
  }
});

/*-------------------------------------------------------------------------------------------------------
 *                                            End of Sign in with forgotpassword
 *
 *-------------------------------------------------------------------------------------------------------
 **/
export default router;
