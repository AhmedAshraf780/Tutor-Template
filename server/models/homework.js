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
  solutions: [String], // this will be the solutions of students to this homework
});

export default mongoose.models.Homework ||
  mongoose.model("Homework", homeworkSchema);
