import Student from "../models/student";
export const login = async (req, res) => {
  try {
    const { dni, password } = req.body;
    const student = await Student.findOne({ dni });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // TODO: compare password

    // TODO: generate token
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const profile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.dni);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
