import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // TODO: Get token from header
  const token = req.headers.authorization.split("Bearer ")[1];
  // TODO: Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = payload;
    next();
  });
};

export default verifyToken;
