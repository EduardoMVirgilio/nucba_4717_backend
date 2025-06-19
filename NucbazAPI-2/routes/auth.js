import { Router } from "express";
import { register } from "../controllers/auth.js";
import registerValidation from "../validations/register.js";
import hasErrors from "../middlewares/hasErrors.js";
import hashPassword from "../middlewares/hash.js";

const router = Router();

router.post(
  "/register",
  [registerValidation, hasErrors, hashPassword],
  register
);

export default router;
