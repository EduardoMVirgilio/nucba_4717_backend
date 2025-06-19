import { body } from "express-validator";
import User from "../models/user.js";

const validateExistUser = async (value) => {
  const user = await User.findOne({ correo: value });
  if (user) {
    throw new Error("El correo ya está registrado");
  }
  return true;
};

const registerValidation = [
  body("nombre")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("clave")
    .isLength({ min: 8 })
    .withMessage("La clave debe tener al menos 8 caracteres"),
  body("clave")
    .isStrongPassword()
    .withMessage(
      "La clave debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"
    ),
  body("correo").custom(validateExistUser),
];

export default registerValidation;
