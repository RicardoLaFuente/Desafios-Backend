const express = require("express");
const routersProducts = express.Router();
const fs = require('fs')



const productos = JSON.parse(fs.readFileSync("./database/productos.json", "utf8", (error) => { throw new Error(error) }));
const generadorID = (array) => {
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

/*routersProducts.post("/", (req, res) => {
    const product = req.body;
    const idGenerado = generadorID(productos)

    productos.push ({id: idGenerado,
        ...product,
        
    });
    res.send('producto agregado')
    fs.writeFileSync('productos.json', JSON.stringify(productos));
});*/
routersProducts.post("/", (req, res) => {
    let productBody = req.body;
    let id =
        productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

    let productNew = { ...productBody, id };

    if (productNew) {
        productos.push(productNew),
            fs.writeFileSync('./database/productos.json', JSON.stringify(productos))

        return res.status(200).json(
            {
                message: 'Producto Agregado',
                productNew,
            });
    } else {
        res.status(400).json({
            message: 'Error'
        });
    }


});


routersProducts.put("/:pid", (req, res) => {
    const { pid } = req.params;

    const bodyProduct = req.body;
    console.log("prodActualizado", bodyProduct);
    let idExist = productos.find((pro) => pro.id === +pid);
    console.log("antes", idExist);
    if (idExist) {
        idExist = { id: +pid, ...bodyProduct };
        let indexAct = productos.findIndex((pro) => pro.id === +pid);
        productos[indexAct] = idExist;
        fs.writeFileSync('productos.JSON', JSON.stringify(productos));
        res.send("Producto Actualizado");
    } else {
        res.status(400);
        res.send("No existe un producto con esa ID");
    }
    // Actualizar Productos
})





routersProducts.delete("/:pid", (req, res) => {
    let arrayVacio = [];
    const id = +req.params.pid;
    productos.map((product) => {
        if (parseInt(product.id) !== parseInt(id)) arrayVacio.push(product)

    })
    console.log('arrayvacio', arrayVacio)
    fs.writeFileSync('./database/productos.json', JSON.stringify(arrayVacio));
    res.send('Producto eliminado');
});



module.exports = routersProducts;