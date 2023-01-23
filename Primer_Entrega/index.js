const express = require("express");
const app = express();
const cartsRouters = require('./routers/cartsRouters');
const productsRouters = require('./routers/productsRouters')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouters);
app.use('/api/carts', cartsRouters);


const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});