const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");

let cartBase = JSON.parse(fs.readFileSync("./database/carritos.json", "utf-8"));
let productCarrito = JSON.parse(fs.readFileSync("./database/productos.json", "utf-8"));

const generadorID = (array) => {

    let id = 1 //tenemos la variable ID

    const ultimoElemento = array[array.length - 1]//Tomamos el ultimo elemento del array (si existe)

    if (ultimoElemento) { id = ultimoElemento.id + 1 }
    //Si el ultimo elemento existe, vamos a hacer que id sea igual al id del ultimo elemento + 1

    return id;//retornamos el id
};

console.log(cartBase)
routerCarts.post("/", (req, res) => {

    const products = [];
    const idGenerada = generadorID(cartBase);
    cartBase.push({ id: idGenerada, products: products })
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
    const idcart = cartBase.find((pro) => pro.id === +cid);
    const carritoId = idcart.products
  
    const {pid} = req.params;
    const idpro = productCarrito.find((pro) => pro.id === +pid);
    const proId = idpro.id
 
  const productNew = {
    id:proId,
    quantity: 1
  }
  carritoId.push(productNew)
  const checkInCart = cartBase.find(p => p.id === +carritoId)

  if(checkInCart) {
    const verify1 = checkInCart.products.find(product=>product.id===proId)
  
    if(verify1){
        quantity++
        
    }else{
        carritoId.push(productNew)
    }
  }

  fs.writeFileSync("./database/carritos.json", JSON.stringify(cartBase));
    
    const buscarCarrito=carritoId.find((pro) => pro.product === +pid);

  
    res.send(idcart);
    // agregar el producto al carrito
});



module.exports = routerCarts;