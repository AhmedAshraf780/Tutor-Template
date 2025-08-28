import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
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
  isPassed: {
    type: Boolean,
    default: false,
  },
  solutions: [String],
});

export default mongoose.models.Exam || mongoose.model("Exam", examSchema);
