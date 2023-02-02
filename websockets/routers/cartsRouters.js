const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');

const cartBase = JSON.parse(fs.readFileSync("./database/carritos.json", "utf-8"));
let productCarrito = JSON.parse(fs.readFileSync("./database/productos.json", "utf-8"));


const generadorID = (array) => {

    let id = 1 //tenemos la variable ID

    const ultimoElemento = array[array.length - 1]//Tomamos el ultimo elemento del array (si existe)

    if (ultimoElemento) { id = ultimoElemento.id + 1 }
    //Si el ultimo elemento existe, vamos a hacer que id sea igual al id del ultimo elemento + 1

    return id;//retornamos el id
};


routerCarts.post("/", (req, res) => {

    const products = [];
    const idGenerada = generadorID(cartBase);
    cartBase.push({ id:uuidv4(), products: products })
    fs.writeFileSync("./database/carritos.json", JSON.stringify(cartBase));

    res.send("Carrito creado");
});

routerCarts.get("/:cid", (req, res) => {
    const { cid } = req.params;
    const idcart = cartBase.find((pro) => pro.id === +cid);
    res.send(idcart);
    console.log(idcart)
    // Mostrar los productos que pertenezcan al carrito con ese cid
});

routerCarts.post("/:cid/product/:pid", (req, res) => {
    const {cid} = req.params;
    const idcart = cartBase.find((pro => pro.id === +cid));
   
  
    const {pid} = req.params;
    const idpro = productCarrito.find((pro => pro.id === +pid));
   
   

   
    const productoRepetido = idcart.products.find( e => e.id === +pid);
    

    if(productoRepetido){
        idcart.products.map( (element)=>{ if(element.id === +pid){element.quantity++}})
    } else {
        idcart.products.push({
            id: idpro.id,
            quantity: 1
        })
    }
   
    fs.writeFileSync("./database/carritos.json", JSON.stringify(cartBase),(err)=>{ throw new Error (err)});
    
    res.send(idcart);
});



module.exports = routerCarts;