const express = require("express");
const cors = require("cors");
const path = require("path");
const server = express();
server.listen(8000);
server.use(cors());
server.set("view engine", "ejs");

server.get("/", (req, res) =>
  res.status(200).send({ message: "Hola desde el GET" })
);
server.post("/", (req, res) => res.status(200).send("Hola desde el POST"));
server.put("/", (req, res) => res.status(200).send("Hola desde el PUT"));
server.delete("/", (req, res) => res.status(200).send("Hola desde el DELETE"));

server.get("/archivo", (req, res) =>
  res.status(200).sendFile(path.join(__dirname, "./photo.jpeg"))
);

server.get("/usuarios", (req, res) =>
  res.render("main", { usuarios: ["Luis", "Julian", "Maria", "Lucas"] })
);

// REST // MVC
