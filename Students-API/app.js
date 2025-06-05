import express from "express";
import connectDB from "./middlewares/connect.js";
import students from "./routes/students.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(connectDB);

app.use("/api/students", students);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
