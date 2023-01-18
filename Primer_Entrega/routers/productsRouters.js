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

/*routersProducts.get("/:pid", (req, res) => {
    let {pid} = +req.params;
    const producto = productos.find(p => p.id === pid);
    res.send(producto);
})*/


routersProducts.get("/:pid", (req, res) => {
    const pid = productos.find((e) => e.id === Number(req.params.id));
    res.send(pid);
    console.log(pid)

});

routersProducts.post("/", (req, res) => {
    const product = req.body;
    productos.push ({
        ...product,
    });
    res.send('producto agregado')
});

routersProducts.put("/:pid", (req, res) => {

    const id =req.params.pid;
    const product=req.body;
    const p=productos.find(p => p.id===pid);
    if(!!p) {
        p = {
            ...product,
            id: pid,
        }
        res.send('Producto actualizado');
    } else {
        res.status(400).send('No existe un producto con ese id');
    }
});

routersProducts.delete("/:pid", (req, res) => {
    let arrayVacio =[];
    productos.map((product) => {
        if (product.id !== id) arrayVacio.push(product)
        console.log('arrayvacio', arrayVacio)
        res.send('Producto eliminado');
    })
});



module.exports = routersProducts;