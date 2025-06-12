const hash = (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    // TODO: hash password
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default hash;
