// import { Router } from "express";
const { Router } = require("express");
const website = new Router();
// import { welcome, usuarios } from "../controllers/website.controller.js";
// import websiteController from "../controllers/website.controller.js";
const { welcome, usuarios } = require("../controllers/website.controller.js");
website.get("/", welcome);
website.get("/usuarios", usuarios);

// export default website
module.exports = website;
