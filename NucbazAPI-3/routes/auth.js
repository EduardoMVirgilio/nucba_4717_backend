import { Router } from "express";
import { register, confirm, login, refreshToken } from "../controllers/auth.js";
import registerValidation from "../validations/register.js";
import hasErrors from "../middlewares/hasErrors.js";
import hashPassword from "../middlewares/hash.js";
import { confirmValidation } from "../validations/confirm.js";
import loginValidation from "../validations/login.js";
const router = Router();

router.post(
  "/register",
  [registerValidation, hasErrors, hashPassword],
  register
);

router.post("/login", [loginValidation, hasErrors], login);

router.post("/refresh", refreshToken);

router.get("/confirm", confirmValidation, confirm);

export default router;
