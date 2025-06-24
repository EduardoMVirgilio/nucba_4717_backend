import { body } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const validateExist = async (value) => {
  const user = await User.findOne({ correo: value });
  if (!user) {
    throw new Error("El correo no está registrado");
  }
  return true;
};

const validatePassword = async (value, { req }) => {
  const user = await User.findOne({ correo: req.body.correo });
  if (!user) {
    throw new Error("El correo no está registrado");
  }
  const isMatch = await bcrypt.compare(value, user.clave);
  if (!isMatch) {
    throw new Error("La clave no es correcta");
  }
  return true;
};

const loginValidation = [
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("clave")
    .isLength({ min: 8 })
    .withMessage("La clave debe tener al menos 8 caracteres"),
  body("clave").isStrongPassword().withMessage("La clave debe ser fuerte"),
  body("correo").custom(validateExist),
  body("clave").custom(validatePassword),
];

export default loginValidation;
