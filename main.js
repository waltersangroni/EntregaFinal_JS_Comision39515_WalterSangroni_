// Variables globales

const listaProductos = [];
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


// Init

pedirProductos()
    .then(() => {
        cargarProductos(listaProductos)
        crearBotonesAgregarAlCarrito()
    }) 
    .catch((error) => {
        console.error("Ocurrió un error al obtener los productos:", error);
    });

recuperarCarritoDelLocalStorage()

crearBotonesCategorias()

crearEventoFormulario()

// Funciones

function crearEventoFormulario() {
    const formularioContainer = document.querySelector(".formulario_container")

    formularioContainer.addEventListener("submit", validarFormulario)
}

function validarFormulario(e){
    e.preventDefault()
    
    const input_Name = document.querySelector("#inputName")
    const input_Email = document.querySelector("#inputEmail")

    let nombre = input_Name.value
    let email = input_Email.value

    if(nombre == "" || email == "") {
        Swal.fire('Por favor ponga su nombre y su mail para confirmar su compra');
        return
    } else {
        Swal.fire('Gracias por su compra!!! en breve nos comunicaremos para coordinar la entrega.');

        localStorage.setItem("nombreUsuario", nombre)
        localStorage.setItem("nombreEmail", email)

        vaciarCarrito();
    }
}

function vaciarCarrito() {
    carrito.splice(0, carrito.length);

    contenedor_carrito.innerHTML = '';

    actualizarTotalCompra()
    actualizarLocalStorage();
  }

function recuperarCarritoDelLocalStorage() {
    // leo el localstorage por si ya hay productos en el carrito
    const recuperarCarrito = JSON.parse(localStorage.getItem("infoCarrito"))
    // si hay algo en el localstorage...
    if(recuperarCarrito != null) {
        // por cada producto que tenia en el carrito del localstorage
        for(let producto of recuperarCarrito) {
            //muestro la tarjeta
            const tarjeta = crearTarjeta(producto, "CARRITO");
            mostrarTarjeta(tarjeta, contenedor_carrito);
            crearBotones(tarjeta);
            //actualizo la cantidad que se muestra
            const textoACambiar = obtenerTexto(producto);
            textoACambiar.textContent = "Cantidad: " + producto.cantidad;
            //y lo agrego al carrito
            carrito.push(producto);
        }
    }
    actualizarTotalCompra()
}

function crearBotonesAgregarAlCarrito() {
    const botonesAgregarAlCarrito = document.querySelectorAll('.producto_agregar');
    
    botonesAgregarAlCarrito.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = obtenerProducto(boton);
            agregarAlCarrito(producto);
        });
    });
}

function pedirProductos() {
    return new Promise(async (resolve, reject) => {
      const resp = await fetch("/data.json");
      const data = await resp.json();
  
      data.forEach((producto) => {
        const nuevoProducto = new Producto(producto.id, producto.img, producto.nombre, producto.precio, producto.categoria);
        listaProductos.push(nuevoProducto);
      });
  
      resolve(); // Resolvemos la Promesa una vez que la operación ha finalizado
    }).catch((error) => {
      return Promise.reject(error); // Rechazamos la Promesa en caso de error
    });
  }

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
                    <button class="menos" data-producto-id=${producto.id}><i class="fas fa-minus"></i></button>
                    <button class="mas" data-producto-id=${producto.id}><i class="fa fa-plus"></i></button>
                    <button class="producto_eliminar" data-producto-id=${producto.id}><i class="far fa-trash-alt"></i></button>

                </div>
                `;
            break;
    }

    return tarjeta;
}

function obtenerProducto(boton) {
    // obtengo el id del producto segun el boton que clickee
    const producto_id = boton.dataset.productoId;

    // con esa id busco el producto en la lista
    return producto = listaProductos.find((producto) => {return producto.id == producto_id;});
}

function agregarAlCarrito(producto) {
    // si el producto ya estaba en el carrito no lo muestro
    let yaExiste = carrito.includes(producto);
    if(yaExiste) {
        //no hago nada
    }
    else {
        const tarjeta = crearTarjeta(producto, "CARRITO");
        mostrarTarjeta(tarjeta, contenedor_carrito);
        crearBotones(tarjeta);

        carrito.push(producto);
    }

    actualizarTotalCompra()
    actualizarLocalStorage();
    
}

function actualizarLocalStorage(){
    // CHEQUEAR SI ESTA OK
    const carritoStr = JSON.stringify(carrito)
    localStorage.setItem("infoCarrito", carritoStr)
}

function crearBotones(tarjeta) {
    const botonesEliminarDelCarrito = document.querySelectorAll(".producto_eliminar");
    const botonEliminar = ultimoElemento(botonesEliminarDelCarrito);

    const botonesSumar = document.querySelectorAll(".mas");
    const botonSumar = ultimoElemento(botonesSumar);
    
    const botonesRestar = document.querySelectorAll(".menos");
    const botonRestar = ultimoElemento(botonesRestar);

    botonSumar.addEventListener('click', () => {
        const producto = obtenerProducto(botonSumar);
                 
        producto.cantidad++;
        const textoACambiar = obtenerTexto(producto);
        textoACambiar.textContent = "Cantidad: " + producto.cantidad;

        actualizarTotalCompra()
        actualizarLocalStorage();
       
    });

    botonRestar.addEventListener('click', () => {
        const producto = obtenerProducto(botonRestar);
        
        if(producto.cantidad > 1){          
            producto.cantidad--;
            const textoACambiar = obtenerTexto(producto);
            textoACambiar.textContent = "Cantidad: " + producto.cantidad;

            actualizarTotalCompra()
            actualizarLocalStorage();
        } 
    });
        
    // boton eliminar del carrito
    botonEliminar.addEventListener('click', () => {
        const producto = obtenerProducto(botonEliminar);

        producto.cantidad = 0;
        eliminarProducto(producto); // saco el producto de la lista carrito
        eliminarTarjeta(tarjeta); // saco la tarjeta html de la pagina

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

function crearBotonesCategorias() {
    const botones = document.querySelectorAll(".boton_categorias");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            filtrarElementos(boton.value);
        });
    });
}

function actualizarTotalCompra(){
    let total_Compra = carrito.reduce((acum, producto)=>{
        return acum + (producto.precio * producto.cantidad)
        
    }, 0)
    localStorage.setItem("precioTotalCompra", total_Compra);
    document.querySelector(".totalCompra").textContent = "El total de tu compra es: $" + total_Compra; 
}          
