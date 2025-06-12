import { Router } from "express";
const router = Router();
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.js";
router.post("/", createCourse);
router.put("/:codigo", updateCourse);
router.delete("/", deleteCourse);

export default router;
