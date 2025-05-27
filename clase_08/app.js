import express from "express";
import { resolve } from "node:path";
const app = express();

app.use(express.static(resolve("./assets")));
app.get("/", (req, res) => res.sendFile(resolve("./pages/index.html")));
app.get("/css", (req, res) => res.sendFile(resolve("./pages/main.css")));

app.listen(3000);
