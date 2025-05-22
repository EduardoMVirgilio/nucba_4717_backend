// import express from "express";
const express = require("express");
const app = express();
// import website from "./routes/website.js";
const website = require("./routes/website.js");
app.use(website);
app.listen(3000);
