import express from "express";
import connectDB from "./middlewares/connect.js";
import students from "./routes/students.js";
import courses from "./routes/courses.js";
import auth from "./routes/auth.js";
const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(connectDB);

app.use("/api/students", students);
app.use("/api/courses", courses);
app.use("/api/auth", auth);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
