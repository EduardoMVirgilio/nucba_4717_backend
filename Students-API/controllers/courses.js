import Course from "../models/course.js";

export const createCourse = async (req, res) => {
  try {
    const codigo = Number(req.body.codigo);
    if (isNaN(codigo)) {
      return res.status(400).json({ message: "Codigo must be a number" });
    }
    const courseExists = await Course.findOne({ codigo });
    if (courseExists) {
      return res
        .status(400)
        .json({ message: "Course with this code already exists" });
    }
    const course = await Course.create({
      codigo,
      nombre: req.body.nombre,
      modulo: req.body.modulo,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    if (isNaN(codigo)) {
      return res.status(400).json({ message: "Codigo must be a number" });
    }
    const course = await Course.findOneAndUpdate({ codigo }, req.body, {
      new: true,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const codigo = Number(req.body.codigo);
    if (isNaN(codigo)) {
      return res.status(400).json({ message: "Codigo must be a number" });
    }
    const course = await Course.findOneAndDelete({ codigo });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
