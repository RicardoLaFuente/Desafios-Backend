const fs = require("fs");
const express = require("express");
const viewsRouters = express.Router();

let productos = JSON.parse(
  fs.readFileSync("./database/productos.JSON", "utf-8")
);

viewsRouters.get("/", (req, res) => {
  res.render("home", { productos });
});
viewsRouters.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = viewsRouters;