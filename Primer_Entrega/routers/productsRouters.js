const express = require("express");
const routersProducts = express.Router();
const { ProductManager } = require('../../desafio2');

const productos = ProductManager.getProducts();



routersProducts.get("/", (req, res) => {
    const limite = req.query.limite;   
    if (limite) {
        console.log(limite)
        let respuesta = productos;
        if (limite && !isNaN(Number(limite))) {
            respuesta = productos.slice(0, limite);
           
        }
        res.send(respuesta);
    }
    res.send(productos);
   
});


routersProducts.get("/:pid", (req, res) => {

});

routersProducts.post("/", (req, res) => {

});

routersProducts.put("/:pid", (req, res) => {

});

routersProducts.delete("/:pid", (req, res) => {

});



module.exports = routersProducts;