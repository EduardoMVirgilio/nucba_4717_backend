import express from "express";
const router = express.Router();
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.js";
router.get("/", getStudents);
router.get("/:dni", getStudent);
router.post("/", createStudent);
router.put("/:dni", updateStudent);
router.delete("/", deleteStudent);

export default router;
