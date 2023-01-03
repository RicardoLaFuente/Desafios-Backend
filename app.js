const express = require('express');
const { ProductManager } = require('./desafio2');

const app = express();
const port = 8080;

const productos = ProductManager.getProducts();

app.get('/products', (req, res) => {
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
})

app.get("/products/:id", (req, res) => {

    const pid = productos.find((e) => e.id === Number(req.params.id));
    res.send(pid);
    console.log(pid)
});
/*app.get("/productos", (req, res) => {
    const limite = req.query.limite;
    console.log(limite)
    let respuesta = productos;
    if (limite && !isNaN(Number(limite))) {
        respuesta = productos.slice(0, limite);
    }
    res.send(respuesta);
    
});*/

app.listen(port, () => {
    console.log('servidor levantado en el puerto ', port);
});