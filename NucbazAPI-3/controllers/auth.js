import User from "../models/user.js";
import mail from "../utils/mail.js";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;
    const token = randomstring.generate(6); // Genera un token de 6 caracteres
    const user = new User({ nombre, correo, clave, token });
    await user.save();
    mail(
      user.correo,
      "Confirmación de registro",
      `Gracias por registrarte, verifica tu correo para confirmar tu registro, con este es tu token: http://localhost:3030/auth/confirm?token=${token}`
    );
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirm = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.validado = true;
    await user.save();
    mail(
      user.correo,
      "Confirmación de registro",
      `Gracias por confirmar tu registro, ahora puedes iniciar sesión`
    );
    res.status(200).json({ message: "Usuario confirmado", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await User.findOne({ correo });
    const token = jwt.sign({ user: user._id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await User.findOne({ correo });
    jwt.verify(req.headers["token"], process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }
      const refreshToken = jwt.sign({ user: user._id }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });
      res.status(200).json({ token: refreshToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
