// Variables globales

const carrito = [];
const contenedor_catalogo = document.querySelector(".main_container")
const contenedor_carrito = document.querySelector(".carrito_container")

// Objetos

function Producto(id, img, nombre, precio, categoria) {
  this.id = id;
  this.img = img;  
  this.nombre = nombre;
  this.precio = precio;
  this.cantidad = 1;
  this.categoria = categoria;
}

const producto1 = new Producto("1", "img/moda1.JPG", "Remera negra", 3500, "hombre");
const producto2 = new Producto("2","img/moda2.JPG", "Remera y pantalon", 6500, "mujer");
const producto3 = new Producto("3","img/moda3.JPG","Remara blanca", 3500, "hombre");
const producto4 = new Producto("4","img/moda4.JPG","Piloto lluvia", 9500, "mujer");
const producto5 = new Producto("5","img/moda5.JPG","Saco otoño", 8500, "hombre");
const producto6 = new Producto("6","img/moda6.JPG","Remera verde", 3000, "mujer");
const producto7 = new Producto("7","img/moda7.JPG","Camisa", 4500, "mujer");
const producto8 = new Producto("8","img/moda8.JPG","Musculosa", 3000, "hombre");
const producto9 = new Producto("9","img/moda9.JPG","Pollera", 4500, "mujer");
const producto10 = new Producto("10","img/moda10.JPG","Remera clasica", 2500, "mujer");
const producto11 = new Producto("11","img/moda11.JPG","Pantalon", 5500, "hombre");
const producto12 = new Producto("12","img/moda12.JPG","Camisa verde", 4500, "hombre");

// Arrays

const listaProductos = [
    producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12
];


// ---------------------MAIN---------------------

// leo el localstorage por si ya hay productos en el carrito
const recuperarCarrito = JSON.parse(localStorage.getItem("infoCarrito"))
// si hay algo en el localstorage...
if(recuperarCarrito != null) {
    // por cada producto que tenia en el carrito del localstorage
    for(let producto of recuperarCarrito) {
        //muestro la tarjeta
        const tarjeta = crearTarjeta(producto, "CARRITO");
        mostrarTarjeta(tarjeta, contenedor_carrito);
        crearEventListenerDelBoton(tarjeta);
        //actualizo la cantidad que se muestra
        const textoACambiar = obtenerTexto(producto);
        textoACambiar.textContent = "Cantidad: " + producto.cantidad;
        //y lo agrego al carrito
        carrito.push(producto);
    }
}

// CARGAR CATALOGO

cargarProductos(listaProductos);

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

// EVENTO FORMULARIO

const formularioContainer = document.querySelector(".formulario_container")
const input_Name = document.querySelector("#inputName")
const input_Email = document.querySelector("#inputEmail")

formularioContainer.addEventListener("submit", validarFormulario)

function validarFormulario(e){
    e.preventDefault()
    
    localStorage.setItem("nombreUsuario", `${input_Name.value}`)
    localStorage.setItem("nombreEmail", `${input_Email.value}`)


    //subir nombre y mail al localstorage
    //cartelito de felicidades por su compra
    //vaciar carrito
}

// ---------------------FUNCIONES---------------------

function cargarProductos(listaAMostrar) {
    for (let producto of listaAMostrar){
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
                    <p class="cantidad_producto" data-producto-id=${producto.id}>Cantidad: 1</p>
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

    // con esa id busco el producto en la lista
    return producto = listaProductos.find((producto) => {return producto.id == producto_id;});
}

function agregarAlCarrito(producto) {
    // si el producto ya estaba en el carrito no lo muestro
    let yaExiste = carrito.includes(producto);
    if(yaExiste) {
        mismoProducto(producto);
    }
    else {
        const tarjeta = crearTarjeta(producto, "CARRITO");
        mostrarTarjeta(tarjeta, contenedor_carrito);
        crearEventListenerDelBoton(tarjeta);

        carrito.push(producto);
    }

    actualizarTotalCompra()
    actualizarLocalStorage();
    
}

function mismoProducto(producto){
    producto.cantidad++;
    const textoACambiar = obtenerTexto(producto);
    textoACambiar.textContent = "Cantidad: " + producto.cantidad;
} 

function actualizarLocalStorage(){
    // CHEQUEAR SI ESTA OK
    const carritoStr = JSON.stringify(carrito)
    localStorage.setItem("infoCarrito", carritoStr)
}

function crearEventListenerDelBoton(tarjeta) {
    const botonesEliminarDelCarrito = document.querySelectorAll(".producto_eliminar");
    const botonNuevo = ultimoElemento(botonesEliminarDelCarrito);
        
    // boton eliminar del carrito
    botonNuevo.addEventListener('click', () => {
        const producto = obtenerProducto(botonNuevo);
        
        if(producto.cantidad==1) {
            eliminarProducto(producto); // saco el producto de la lista carrito
            eliminarTarjeta(tarjeta); // saco la tarjeta html de la pagina
        } else {
            producto.cantidad--;
            const textoACambiar = obtenerTexto(producto);
            textoACambiar.textContent = "Cantidad: " + producto.cantidad;
        }

        actualizarTotalCompra()
        actualizarLocalStorage();
    });
}

function ultimoElemento(lista){
    return lista[lista.length - 1];
}

function eliminarTarjeta(tarjeta){
    tarjeta.remove();
}

function eliminarProducto(producto){
    const productoAEliminar = carrito.indexOf(producto);
    carrito.splice(productoAEliminar, 1);
}

function obtenerTexto(producto) {
    const textosCantidad = document.querySelectorAll(".cantidad_producto"); //agarro todos los textos con esta clase porque sino solo agarra el primer texto siempre
    const textosFiltrados = Array.from(textosCantidad).filter(function(texto) { //filtra el texto que tenga un data-producto-id = al producto que llego por parametro
        return texto.dataset.productoId == producto.id;
    });
    return textosFiltrados[0]; 
}

// FILTRO DE CATEGORIAS -------------------------

function filtrarElementos(filtro) {
    contenedor_catalogo.innerHTML = "";

    let elementosFiltrados = [];

    if (filtro === "todos") {
        elementosFiltrados = listaProductos;
    } else {
        elementosFiltrados = listaProductos.filter(function(productoAFiltrar){
            return productoAFiltrar.categoria === filtro;
        });
    }

    mostrarElementos(elementosFiltrados);
}

function mostrarElementos(listaProductosFiltrados) {
    const listaElementos = document.querySelector("#elementosFiltrados");
    listaElementos.innerHTML = "";

    cargarProductos(listaProductosFiltrados);

    const botonesAgregarAlCarrito = document.querySelectorAll('.producto_agregar');

    botonesAgregarAlCarrito.forEach(boton => {
      boton.addEventListener('click', () => {
        const producto = obtenerProducto(boton);
        agregarAlCarrito(producto);
      });
    }); 
}

const botones = document.querySelectorAll(".boton_categorias");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        filtrarElementos(boton.value);
    });
});


function actualizarTotalCompra(){
    let total_Compra = carrito.reduce((acum, producto)=>{
        return acum + (producto.precio * producto.cantidad)
        
    }, 0)
    localStorage.setItem("precioTotalCompra", total_Compra);
    document.querySelector(".totalCompra").textContent = "El total de tu compra es: $" + total_Compra;
    
}

actualizarTotalCompra()



// PENDIENTES: 
// 3-AL COMPRAR Y ENVIAR FORMULARIO, SE TIENE QUE VACIAR EL CARRITO Y APARECER UN MENSAJE DE COMPRA FINALIZADA              
