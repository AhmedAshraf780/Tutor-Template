import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Form", "PDF"],
    required: true,
  },
  url: {
    type: String,
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
  homeWorkSolution: {
    type: String, // it will be url for firebase storing the pdf
  },
  solutions: [
    {
      name: String, // this will be the name of the student
      grade: Number,
      phone: String,
      submittedAt: Date,
      studentId: String,
      url: String,
    },
  ], // this will be the solutions of students to this homework
});

export default mongoose.models.Homework ||
  mongoose.model("Homework", homeworkSchema);
