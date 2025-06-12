import { Router } from "express";
import { login, profile } from "../controllers/auth.js";
import verifyToken from "../middlewares/verify.js";
const router = Router();
router.post("/login", login);
router.get("/profile", verifyToken, profile);

export default router;
