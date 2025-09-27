import express from "express";
import Student from "../models/student.js";
import Homework from "../models/homework.js";
import fs from "fs";

import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.session.userId });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not Existed",
      });
    }

    console.log(student.inGroup);
    return res.status(200).json({
      success: true,
      inGroup: student.inGroup,
      student,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.get("/assignments", async (req, res) => {
  try {
    // get this student by its id not _id
    const student = await Student.findOne({ id: req.session.userId })
      .select("homeworks exams")
      .populate("homeworks")
      .populate("exams");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "assignments sent successfully...",
      homeworks: student.homeworks,
      exams: student.exams,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.post(
  "/assignments",
  upload.fields([{ name: "solution", maxCount: 1 }]),
  async (req, res) => {
    console.log("Got assignment request");
    try {
      const { type, studentId, assignmentId } = req.body;

      console.log(studentId);
      if (type === "homework") {
        const homework = await Homework.findOne({ id: assignmentId });

        if (!homework) {
          return res.status(404).json({
            success: false,
            message: "HomeWork not found",
          });
        }
        // upload the solution to cloudinary
        const pdfSolution = req.files?.solution?.[0];

        const result = await cloudinary.uploader.upload(pdfSolution.path, {
          folder: "StudentsSolutions",
          use_filename: true,
          unique_filename: false,
        });

        const studentSolutionUrl = result.secure_url;
        fs.unlinkSync(pdfSolution.path);

        // fetch the student
        const student = await Student.findOne({ id: studentId });

        homework.solutions.push({
          name: student.name,
          grade: student.grade,
          phone: student.phone,
          submittedAt: new Date().toISOString(),
          studentId,
          url: studentSolutionUrl,
        });
        await homework.save();

        return res.status(200).json({
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server Internal Error",
      });
    }
  },
);

router.get("/notes", async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.session.userId });

    return res.status(200).json({
      success: true,
      notes: student.notes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.post("/notes", async (req, res) => {
  const { title, lesson, description, date } = req.body;
  console.log(title, lesson, description);
  try {
    const student = await Student.findOne({ id: req.session.userId });

    student.notes.push({
      title,
      lesson,
      description,
      date,
    });

    await student.save();
    return res.status(200).json({
      success: true,
      message: "Note created successfully",
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
