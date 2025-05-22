const welcome = (req, res) => {
  return res.send("Hola desde un controlador");
};

const usuarios = (req, res) => {
  let data = [{ username: "edu", clave: "Hola1234!" }];
  return res.json(data);
};

module.exports = { welcome, usuarios };
