// import bcrypt from "bcryptjs";
import argon2 from "argon2";
const hash = async (req, res, next) => {
  try {
    const { password } = req.body;
    // TODO: hash password
    if (password) {
      const hashPassword = await argon2.hash(password);
      req.body.password = hashPassword;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default hash;
