const socket = io();

let formulario = document.querySelector(".formulario");
let formularioEliminar = document.querySelector(".formularioEliminar");
let productsRealTime = document.querySelector("#productsRealTime");

const cargaDeProductos = () => {
  socket.on("cargadeProductos", (data) => {
    productsRealTime.innerHTML = "";

    data.forEach((e) => {
      productsRealTime.innerHTML += `<ul>
            <li><h3>Nombre: ${e.title}</h3></li>
            <li>Description: ${e.description} </li>
            <li>Precio: ${e.price} </li>
            <li>Imagenes: ${e.thumbnail} </li>
            <li>Codigo: ${e.code} </li>
            <li>Stock: ${e.stock} </li>
            <li>ID: ${e.id} </li>
         </ul>`;
    });
  });
};
cargaDeProductos();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let producto = {
    title: document.querySelector("#title").value,
    description: document.querySelector("#description").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
    code: document.querySelector("#code").value,
    stock: document.querySelector("#stock").value
  }

  socket.emit("productoNuevo", producto);
  socket.on("productos", cargaDeProductos());
  console.log("nuevo", cargaDeProductos)
});

formularioEliminar.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let idaEliminar = document.querySelector("#idDelete").value;
  socket.emit("idaEliminar", idaEliminar);

})