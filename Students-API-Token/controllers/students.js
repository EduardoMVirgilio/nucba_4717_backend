import Student from "../models/student.js";
import Course from "../models/course.js";
export const getStudents = async (req, res) => {
  try {
    let options = {};
    options.activo = Boolean(Number(req.query.activo));
    const students = await Student.find(options).populate(["curso"]);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    let options = {};
    options.activo = Boolean(Number(req.query.activo));
    const student = await Student.findOne(
      { dni: req.params.dni },
      options
    ).populate(["curso"]);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const dni = Number(req.body.dni);

    if (isNaN(dni)) {
      return res.status(400).json({ message: "DNI must be a number" });
    }

    const studentExists = await Student.findOne({ dni });
    if (studentExists) {
      return res
        .status(400)
        .json({ message: "Student with this DNI already exists" });
    }

    if (!req.body.nombre || !req.body.email || !req.body.curso) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const courseExists = await Course.findOne({ codigo: req.body.curso });
    if (!courseExists) {
      return res
        .status(404)
        .json({ message: "Course with this code does not exist" });
    }

    const student = await Student.create({
      dni,
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password,
      curso: courseExists?._id,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const dni = Number(req.params.dni);

    if (isNaN(dni)) {
      return res.status(400).json({ message: "DNI must be a number" });
    }

    const studentExists = await Student.findOne({ dni });
    if (!studentExists) {
      return res
        .status(404)
        .json({ message: "Student with this DNI does not exist" });
    }

    if (req.body.curso) {
      const courseExists = await Course.findOne({ codigo: req.body.curso });
      if (!courseExists) {
        return res
          .status(404)
          .json({ message: "Course with this code does not exist" });
      }
      req.body.curso = courseExists?._id;
    }

    const student = await Student.findOneAndUpdate({ dni }, req.body, {
      new: true,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const dni = Number(req.body.dni);

    if (isNaN(dni)) {
      return res.status(400).json({ message: "DNI must be a number" });
    }

    const studentExists = await Student.findOne({ dni });
    if (!studentExists) {
      return res
        .status(404)
        .json({ message: "Student with this DNI does not exist" });
    }
    const student = await Student.findOneAndDelete({ dni });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const softDeleteStudent = async (req, res) => {
  try {
    const dni = Number(req.body.dni);

    if (isNaN(dni)) {
      return res.status(400).json({ message: "DNI must be a number" });
    }

    const studentExists = await Student.findOne({ dni });
    if (!studentExists) {
      return res
        .status(404)
        .json({ message: "Student with this DNI does not exist" });
    }
    const student = await Student.findOneAndUpdate({ dni }, { activo: false });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
