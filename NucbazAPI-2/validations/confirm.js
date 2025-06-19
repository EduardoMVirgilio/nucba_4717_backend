import { query } from "express-validator";

export const confirmValidation = [
  query("token")
    .isLength({ min: 6 })
    .withMessage("El token debe tener al menos 6 caracteres"),
];
