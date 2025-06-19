import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;
    const user = new User({ nombre, correo, clave });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
