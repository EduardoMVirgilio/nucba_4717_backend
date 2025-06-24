import { hashSync } from "bcryptjs";

const hashPassword = (req, res, next) => {
  const { clave } = req.body;
  req.body.clave = hashSync(clave, 10);
  next();
};

export default hashPassword;
