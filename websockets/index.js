const routersProducts = require("./routers/productsRouters");
const routerCarts = require("./routers/cartsRouters");
const viewsRouters = require("./routers/viewsRouter");
const fs = require("fs");
const { v4: uuidv4} = require('uuid');
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/api/products", routersProducts);
app.use("/api/carts", routerCarts);
app.use("/", viewsRouters);

const PORT = 8081;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente");
  let productos = JSON.parse(
    fs.readFileSync("./database/productos.JSON", "utf-8")
  );
  socket.emit("cargadeProductos", productos);
  socket.on("productoNuevo", (products)=>{
    let objetoNuevo = {id:uuidv4() , ...products};
    productos.push(objetoNuevo);  
    // aca cambie "products.push" por "productos.push" me tiraba mal la funcion
    fs.writeFileSync("./database/productos.json", JSON.stringify(productos))

    socket.emit("cargadeProductos", productos);
  })

  socket.on("idaEliminar" , (id)=>{
    let arrayVacio =[];
    let productos = JSON.parse(
        fs.readFileSync("./database/productos.JSON", "utf-8"));
        // aca tenia q volver a traer los productos porque no me tomaba "productos"
    productos.map((product) =>{
        if(product.id !== id) arrayVacio.push(product)
  
    })
    fs.writeFileSync("./database/productos.json" , JSON.stringify(arrayVacio) )
    })

    socket.emit('cargadeProductos' , productos);
  
  });
