import Student from "../models/student.js";
// import bcrypt from "bcryptjs";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const login = async (req, res) => {
  try {
    const { dni, password } = req.body;
    const student = await Student.findOne({ dni });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // TODO: compare password
    const isPasswordValid = await argon2.verify(student.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // TODO: generate token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const profile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
