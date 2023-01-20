const express = require("express");
const routersProducts = express.Router();
//const { ProductManager } = require('../../desafio2');
const fs = require('fs')


//const productos = ProductManager.getProducts();
const productos = JSON.parse(fs.readFileSync("productos.json", "utf8", (error) => { throw new Error(error) }));
const generadorID = () => {
    let id = 1
    const ultimoElemento = array[array.length - 1]
    if (ultimoElemento) { id = ultimoElemento.id + 1 }
    return id;
};

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
    const pid = productos.find((e) => parseInt(e.id) === parseInt(req.params.pid));
    res.send(pid);
    console.log(pid)

});

routersProducts.post("/", (req, res) => {
    const product = req.body;
  

    productos.push ({
        id: generadorID,
        ...product,
        
    });
    res.send('producto agregado')
    fs.writeFileSync('productos.json', JSON.stringify(productos));
});
/*routersProducts.post("/", (req, res) => {
    let product = req.body;
    let id = product.length > 0 ? product[product.length - 1].id + 1 : 1;
    let productNew = { id, ...product };

    if (productNew) {
        productos.push(productNew),
            fs.writeFileSync('productos.json', JSON.stringify(productos))

        return res.status(200).json(
            {
                message: 'Producto Agregado',
                productNew
            });
    } else {
        res.status(400).json({
            message: 'Error'
        });
    }


});*/

routersProducts.put("/:pid", (req, res) => {

    const id = +req.params.pid;
    const product = req.body;
    const p = productos.find(p => parseInt(p.id) === parseInt(id));
    if (!!p) {
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
    let arrayVacio = [];
    const id = +req.params.pid;
    productos.map((product) => {
        if (parseInt(product.id) !== parseInt(id)) arrayVacio.push(product)

    })
    console.log('arrayvacio', arrayVacio)
    fs.writeFileSync('productos.json', JSON.stringify(arrayVacio));
    res.send('Producto eliminado');
});



module.exports = routersProducts;