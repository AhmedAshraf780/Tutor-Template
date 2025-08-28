import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  place: String,
  phone: String,
  grade: Number,
  address: String,

  group: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Group",
  },

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
  notes: [String],
  notfications: [String],
});

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
