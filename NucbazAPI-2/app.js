import express from "express";
import "dotenv/config";
import connect from "./middlewares/connect.js";

const app = express();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connect);

import auth from "./routes/auth.js";
app.use("/auth", auth);

app.listen(PORT);
