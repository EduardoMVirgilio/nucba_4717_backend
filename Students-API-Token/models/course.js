import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  modulo: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
