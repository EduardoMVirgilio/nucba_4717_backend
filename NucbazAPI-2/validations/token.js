import { header } from "express-validator";

export const tokenValidation = [
  header("token").notEmpty().withMessage("El token es requerido"),
];
