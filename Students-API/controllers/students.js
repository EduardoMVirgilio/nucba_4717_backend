import Student from "../models/student.js";

export const getStudents = async (req, res) => {
  try {
    let options = {};
    options.activo = Boolean(Number(req.query.activo));
    const students = await Student.find(options);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    let options = {};
    options.activo = Boolean(Number(req.query.activo));
    const student = await Student.findOne({ dni: req.params.dni }, options);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create({
      dni: req.body.dni,
      nombre: req.body.nombre,
      email: req.body.email,
      curso: req.body.curso,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { dni: req.params.dni },
      req.body,
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ dni: req.body.dni });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
