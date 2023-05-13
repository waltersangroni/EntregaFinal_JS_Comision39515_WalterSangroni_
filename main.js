// Variables globales

const carrito = [];
const contenedor_catalogo = document.querySelector(".main_container")
const contenedor_carrito = document.querySelector(".carrito_container")

// Objetos

function Producto(id, img, nombre, precio) {
  this.id = id;
  this.img = img;  
  this.nombre = nombre;
  this.precio = precio;
}

const producto1 = new Producto("1", "img/moda1.JPG", "Remera negra", 3500);
const producto2 = new Producto("2","img/moda2.JPG", "Remera y pantalon", 6500);
const producto3 = new Producto("3","img/moda3.JPG","Remara blanca", 3500);
const producto4 = new Producto("4","img/moda4.JPG","Piloto lluvia", 9500);
const producto5 = new Producto("5","img/moda5.JPG","Saco otoño", 8500);
const producto6 = new Producto("6","img/moda6.JPG","Remera verde", 3000);
const producto7 = new Producto("7","img/moda7.JPG","Camisa", 4500);
const producto8 = new Producto("8","img/moda8.JPG","Musculosa", 3000);
const producto9 = new Producto("9","img/moda9.JPG","Pollera", 4500);
const producto10 = new Producto("10","img/moda10.JPG","Remera clasica", 2500);
const producto11 = new Producto("11","img/moda11.JPG","Pantalon", 5500);
const producto12 = new Producto("12","img/moda12.JPG","Camisa verde", 4500);

// Arrays

const listaProductos = [
    producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12
];

let total_compra = carrito.reduce((acum, producto)=>{
    return acum + producto.precio
}, 0)

console.log(total_compra);


// ---------------------MAIN---------------------

// CARGAR CATALOGO

cargarProductos();

// EVENTO AGREGAR PRODUCTOS AL CARRITO

// agarro todos los botones del catalogo
const botonesAgregarAlCarrito = document.querySelectorAll('.producto_agregar');

// para cada boton agrego un eventListener
botonesAgregarAlCarrito.forEach(boton => {
  boton.addEventListener('click', () => {
    const producto = obtenerProducto(boton);
    agregarAlCarrito(producto);
  });
});

// EVENTO ELIMINAR PRODUCTOS AL CARRITO

const botonesEliminarDelCarrito = document.querySelectorAll(".producto_eliminar")

botonesEliminarDelCarrito.forEach(botonDel => {
    botonDel.addEventListener('click', () => {
      const producto = obtenerProducto(botonDel);
      eliminarProducto(producto);
    });
  });

  function eliminarProducto (){
    carrito.remove()
  }



// EVENTO FORMULARIO

const formularioContainer = document.querySelector(".formulario_container")
const input_Name = document.querySelector("#inputName")
const input_Email = document.querySelector("#inputEmail")

formularioContainer.addEventListener("submit", validarFormulario)

function validarFormulario(e){
    e.preventDefault()
    console.log(`Nombre: ${input_Name.value}`)
    console.log(`Email: ${input_Email.value}`)
}

// ---------------------FUNCIONES---------------------

function cargarProductos() {
    for (let producto of listaProductos){
        const tarjeta = crearTarjeta(producto, "CATALOGO");
        mostrarTarjeta(tarjeta, contenedor_catalogo);
    }
}

function mostrarTarjeta(tarjeta, contenedor) {
    contenedor.appendChild(tarjeta);
}

function crearTarjeta(producto, tipoTarjeta) {
    let tarjeta = document.createElement("section");

    switch(tipoTarjeta){
        case "CATALOGO":
            tarjeta.innerHTML = 
                `
                <img class="producto_imagen" src=${producto.img} alt="modelos1">
                <div class="producto_detalles">
                    <h2 class="producto_titulo">${producto.nombre}</h2>
                    <p class="producto_precio">$ ${producto.precio}</p>
                    <button class="producto_agregar" data-producto-id=${producto.id}>Agregar al carrito</button>
                </div>
                `;
            break;
        case "CARRITO":
            tarjeta.innerHTML = 
                `
                
                <div class="producto_detalles">
                    <h2 class="producto_titulo">${producto.nombre}</h2>
                    <p class="producto_precio">$ ${producto.precio}</p>
                    <p class="cantidad_producto">Cantidad:</p>
                    <button class="producto_eliminar" data-producto-id=${producto.id}>Eliminar del carrito</button>
                </div>
                `;
            break;
    }

    return tarjeta;
}

function obtenerProducto(boton) {
    // obtengo el id del producto segun el boton que clickee
    const producto_id = boton.dataset.productoId; //ver abajo

    // con esa id buscamos el producto en la lista
    return producto = listaProductos.find((producto) => {return producto.id == producto_id;});
}

function agregarAlCarrito(producto) {
    // si el producto ya estaba en el carrito no lo muestro
    let yaExiste = carrito.includes(producto);
    if(yaExiste) {
        const cantidadAgregar = document.querySelector(".cantidad_producto")
        cantidadAgregar.addEventListener("sumarRango", mismoProducto)       

    }
    else {
        const tarjeta = crearTarjeta(producto, "CARRITO");
        mostrarTarjeta(tarjeta, contenedor_carrito);
    }

    carrito.push(producto);

    // CHEQUEAR SI ESTA OK
    const carritoStr = JSON.stringify(carrito)
    localStorage.setItem("infoCarrito", carritoStr)
    console.log(carritoStr)
    const recuperarCarrito = JSON.parse(localStorage.getItem("infoCarrito"));
    console.log(recuperarCarrito)
}

function mismoProducto(){
    producto.cantidad++;
}



// PENDIENTES: 
// 1-CUANDO AGREGO EL MISMO PRODUCTO AL CARRITO TIENE QUE SUMAR 
// 2-ELIMINAR PRODUCTO
// 3-FUNCION SUMAR EL PRECIO TOTAL DE LOS PRODUCTOS AGREGADOS AL CARRITO
// 4-AL COMPRAR Y ENVIAR FORMULARIO, SE TIENE QUE VACIAR EL CARRITO Y APARECER UN MENSAJE DE COMPRA FINALIZADA              


//esta funcion me la paso chatGPT
//function limpiarCarrito() {
//    while (carritoContainer.firstChild) {
//        carritoContainer.removeChild(carritoContainer.firstChild);
//      }
//}

// Dom eliminar elemento se hace con .remove()

// EXPLICACION DATASET
// <button class="producto_agregar" data-producto_id=${producto.id}>Agregar al carrito</button>
// tenemos un boton que tiene una clase "producto_agregar" y un data "producto_id" que lo llamas a traves de 
// la funcion dataset, que es una funcion que ya existe de javascript

        //  Cuenta el número de veces que se repite el producto
        // const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        //      ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
        //     return itemId === item ? total += 1 : total;
        // }, 0);