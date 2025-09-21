import mongoose from "mongoose";
import { v4 } from "uuid";
import { config } from "../config/config.js";

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: v4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: config.ADMIN_EMAIL,
  },
  password: {
    type: String,
    required: true,
    default: config.ADMIN_PASSWORD,
  },
  myStudents: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      default: [],
    },
  ],
  myGroups: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Group",
      default: [],
    },
  ],
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
