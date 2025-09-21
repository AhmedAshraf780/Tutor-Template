import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  students: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
    },
  ],
  homeworks: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Homework",
    },
  ],
  exams: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Exam",
    },
  ],
});

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
