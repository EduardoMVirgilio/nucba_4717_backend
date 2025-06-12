import express from "express";
const router = express.Router();
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.js";
import hash from "../middlewares/hash.js";
router.get("/", getStudents);
router.get("/:dni", getStudent);
router.post("/", hash, createStudent);
router.put("/:dni", hash, updateStudent);
router.delete("/", deleteStudent);

export default router;
