import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import multer from "multer";

/*
 *    Custom Imports
 * */

import Homework from "../models/homework.js";
import Exam from "../models/exam.js";
import authMiddleWare from "../middleware/auth.middleware.js";
import Student from "../models/student.js";
import Admin from "../models/admin.js";
import Group from "../models/group.js";
import { connectRedis, getRedisClient } from "../utils/connectRedis.js";
import cloudinary from "../config/cloudinary.js";
import checkExpiration from "../middleware/checkExpiration.js";
import { config } from "../config/config.js";

const upload = multer({ dest: "uploads/" });

await connectRedis();
const redisClient = getRedisClient();

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
      success: true,
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

router.get(
  "/students",
  checkExpiration(),
  authMiddleWare(),
  async (req, res) => {
    try {
      // check if students stored in redis
      const cached = await redisClient.get("adminStudents");
      if (cached) {
        const students = JSON.parse(cached);
        console.log("From cached", students);
        return res.status(200).json({
          success: true,
          students,
        });
      }
      const students = await Student.find({}).select("-password");
      console.log(students);
      await redisClient.set("adminStudents", JSON.stringify(students), {
        EX: 60 * 60 * 3,
      });
      return res.status(200).json({
        success: true,
        students,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server Internal Error",
      });
    }
  },
);
router.get("/mygroups", async (req, res) => {
  try {
    console.log("i got mygroups request");
    const cached = await redisClient.get("myGroups");
    if (cached) {
      const adminGroups = JSON.parse(cached);
      return res.status(200).json({
        success: true,
        adminGroups,
      });
    }
    const adminCached = await redisClient.get("admin");
    let admin;
    if (adminCached) {
      admin = JSON.parse(adminCached);
    } else {
      admin = await Admin.findOne({ email: config.ADMIN_EMAIL }).select(
        "myGroups",
      );
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    const groupIds = admin.myGroups;
    const adminGroups = await Group.find({ _id: { $in: groupIds } }).populate(
      "students",
    );
    // cache myGroups
    await redisClient.set("myGroups", JSON.stringify(adminGroups), {
      EX: 60 * 60 * 3,
    });
    // cache admin himself
    await redisClient.set("admin", JSON.stringify(admin));

    return res.status(200).json({
      success: true,
      adminGroups,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.post("/mygroups", async (req, res) => {
  const { name, students } = req.body;

  try {
    const existed = await Group.findOne({ name });
    if (existed) {
      return res.status(400).json({
        success: false,
        message: "This group name is taken",
      });
    }

    const validStudents = await Student.find({ id: { $in: students } }).select(
      "_id",
    );
    const studentIds = validStudents.map((s) => s._id);

    for (let id of studentIds) {
      let student = await Student.findById(id);
      student.inGroup = true;
      await student.save();
    }

    const group = new Group({
      id: uuidv4(),
      name,
      students: studentIds,
    });

    await group.save();

    const admin = await Admin.findOne({ email: config.ADMIN_EMAIL });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.myGroups.push(group._id);
    await admin.save();

    const updatedGroups = await Group.find({
      _id: { $in: admin.myGroups },
    }).populate("students");

    const populatedGroup = await Group.findById(group._id).populate("students");

    await redisClient.set("admin", JSON.stringify(admin), { EX: 60 * 60 * 3 });
    await redisClient.set("myGroups", JSON.stringify(updatedGroups), {
      EX: 60 * 60 * 3,
    });

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: populatedGroup,
    });
  } catch (err) {
    console.error("Error creating group:", err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.delete("/mygroups/:groupId", async (req, res) => {
  const { groupId } = req.params;
  console.log("i got delete request");
  console.log(groupId);
  try {
    const admin = await Admin.findOne({ email: config.ADMIN_EMAIL });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // Remove from admin
    admin.myGroups = admin.myGroups.filter((g) => g.toString() !== groupId);
    await admin.save();

    // Delete group itself
    await Group.findByIdAndDelete(groupId);

    const updatedGroups = await Group.find({
      _id: { $in: admin.myGroups },
    }).populate("students");
    await redisClient.set("myGroups", JSON.stringify(updatedGroups), {
      EX: 60 * 60 * 3,
    });
    await redisClient.set("admin", JSON.stringify(admin), { EX: 60 * 60 * 3 });

    return res
      .status(200)
      .json({ success: true, message: "Group deleted successfully" });
  } catch (err) {
    console.error("Error deleting group:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server Internal Error" });
  }
});

router.patch("/mygroups", async (req, res) => {
  const { groupId, students } = req.body;
  console.log("i got patch request", groupId);

  try {
    const validStudents = await Student.find({ id: { $in: students } }).select(
      "_id",
    );
    const studentIds = validStudents.map((s) => s._id);

    const group = await Group.findOneAndUpdate(
      { id: groupId },
      { students: studentIds },
      { new: true },
    ).populate("students");

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    const admin = await Admin.findOne({ email: config.ADMIN_EMAIL }).select(
      "myGroups",
    );
    const adminGroups = await Group.find({
      _id: { $in: admin.myGroups },
    }).populate("students");

    await redisClient.set("myGroups", JSON.stringify(adminGroups), {
      EX: 60 * 60 * 3,
    });

    return res.status(200).json({
      success: true,
      message: "Group updated successfully",
      group,
    });
  } catch (err) {
    console.error("Error updating group:", err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

/*
 *                 Assignments
 * **/

router.post(
  "/assignments",
  upload.fields([
    { name: "pdfAssignment", maxCount: 1 },
    { name: "pdfSolution", maxCount: 1 },
  ]),
  async (req, res) => {
    const { type, groupId, googleForm, name } = req.body;

    try {
      const group = await Group.findById(groupId).populate("students");
      if (!group) {
        return res
          .status(404)
          .json({ success: false, message: "Group not found" });
      }

      let assignment;
      let wayOfAssignment = "Form";
      let assignmentUrl = null;
      let solutionUrl = null;

      // check files
      const pdfAssignment = req.files?.pdfAssignment?.[0];
      const pdfSolution = req.files?.pdfSolution?.[0];

      if (pdfAssignment) {
        wayOfAssignment = "PDF";

        const result = await cloudinary.uploader.upload(pdfAssignment.path, {
          // resource_type: "auto", // needed for PDFs
          folder: "assignments",
          use_filename: true,
          unique_filename: false,
          // access_mode: "public"
        });
        assignmentUrl = result.secure_url;

        // cleanup
        fs.unlinkSync(pdfAssignment.path);
      }

      if (pdfSolution) {
        const result = await cloudinary.uploader.upload(pdfSolution.path, {
          // resource_type: "auto", // needed for PDFs
          folder: "solutions",
          use_filename: true,
          unique_filename: false,
          // access_mode: "public",
        });
        solutionUrl = result.secure_url;

        // cleanup
        fs.unlinkSync(pdfSolution.path);
      }

      // create assignment object
      if (type === "homework") {
        assignment = new Homework({
          id: uuidv4(),
          name,
          type: wayOfAssignment,
          url: assignmentUrl || googleForm,
          homeWorkSolution: solutionUrl,
        });
      } else if (type === "exam") {
        assignment = new Exam({
          id: uuidv4(),
          name,
          type: wayOfAssignment,
          url: assignmentUrl || googleForm,
          // in the exam there will not be a solution pdf
        });
      }

      await assignment.save();

      // add assignment to group + students
      if (type === "homework") group.homeworks.push(assignment._id);
      else if (type === "exam") group.exams.push(assignment._id);

      await group.save();

      const students = await Student.find({ _id: { $in: group.students } });
      for (const student of students) {
        if (type === "homework") student.homeworks.push(assignment._id);
        else if (type === "exam") student.exams.push(assignment._id);
        await student.save();
      }

      // update redis
      const updatedGroups = await Group.find({}).populate("students homeworks");
      await redisClient.set("myGroups", JSON.stringify(updatedGroups), {
        EX: 60 * 60 * 3,
      });

      return res.status(200).json({
        success: true,
        message: "Assignment created successfully",
        assignment,
      });
    } catch (err) {
      console.error("Error creating assignment:", err);
      return res.status(500).json({
        success: false,
        message: "Server Internal Error",
      });
    }
  },
);

router.get("/assignments:groupId", async (req, res) => {
  try {
    const { groupId } = req.params;

    console.log("i got admin assignments", groupId);
    const group = await Group.findById(groupId)
      .select("homeworks exams")
      .populate("homeworks")
      .populate("exams");

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Student doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "assignments sent successfully...",
      homeworks: group.homeworks,
      exams: group.exams,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.get("/assignments/solutions/", async (req, res) => {
  const { assignmentId, type } = req.query;
  console.log(assignmentId, type);
  try {
    let assignment;
    if (type === "homework") {
      assignment = await Homework.findById(assignmentId);
    } else if (type === "exam") {
      assignment = await Exam.findById(assignmentId);
    }
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignement not found",
      });
    }

    return res.status(200).json({
      success: true,
      solutions: assignment.solutions,
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
