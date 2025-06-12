import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
