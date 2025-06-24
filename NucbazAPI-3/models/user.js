import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nombre: String,
  correo: { type: String, unique: true },
  clave: String,
  token: String,
  validado: { type: Boolean, default: false },
});

const User = model("User", userSchema);

export default User;
