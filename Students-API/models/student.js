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
  curso: {
    type: String,
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
