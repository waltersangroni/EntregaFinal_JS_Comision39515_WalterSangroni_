// Variables globales

const carrito = [];
let precioCarrito = 0;

// Objetos

function Producto(nombre, color, precio, categoria) {
  this.nombre = nombre;
  this.color = color;
  this.precio = precio;
  this.categoria = categoria;
}

const producto1 = new Producto("Remera", "Negra", 3500);
const producto2 = new Producto("Pantalon", "Azul", 6500);
const producto3 = new Producto("Buzo", "Rojo", 5500);
const producto4 = new Producto("Campera", "Negra", 9500);

// Arrays

const listaProductos = [
    producto1, producto2, producto3, producto4
];

// Funciones

const agregarAlCarrito = (producto) => {
    carrito.push(producto);
    
    precioCarrito += producto.precio;

    mostrarActualizacion();
}

/*const quitarDelCarrito = (producto) => {
    const indice = carrito.findIndex(producto);
    carrito.splice(indice, 1);

    precioCarrito -= producto.precio;

    mostrarActualizacion();
} No supe incorporar la funcion de eliminar del carrito*/

const mostrarActualizacion = () =>  {
    console.log("Producto agregado al carrito\nCantidad de productos: " + carrito.length + "\nTotal: " + precioCarrito);
}

const mostrarCarrito = () => {
    console.log("\n\n\nCARRITO\n\n")
    for(i=0; i < carrito.length; i++) {
        console.log("Nombre: " + carrito[i].nombre + "\nPrecio: " + carrito[i].precio + "\n\n");
    }
    console.log("\nTOTAL: " + precioCarrito);
}

// Main

let respuestaUsuario = Number(prompt("¿Que producto desea agregar al carrito? \n1.Remera \n2.Pantalon \n3.Buzo\n4.Campera\n0.Salir"));
let nombreProducto = "";

while(respuestaUsuario != "0") {
    switch (respuestaUsuario) {
        case 1:
            nombreProducto = "Remera"
            break;
        case 2:
            nombreProducto = "Pantalon"
            break;
        case 3:
            nombreProducto = "Buzo"
            break;
        case 4:
            nombreProducto = "Campera"
            break;
        case 0:
            nombreProducto = "Salir";
            break;
        case NaN:
            nombreProducto = "NULL";
        default:
            nombreProducto = "NULL";
            break;
    }
    
    if(nombreProducto == "NULL") {
        alert("Por favor ingrese un numero");
    } else if (nombreProducto == "Salir") {
        console.log("Vuelva Pronto")
    }
    else {
        let productoSeleccionado = listaProductos.find((producto) => producto.nombre === nombreProducto);
        agregarAlCarrito(productoSeleccionado);
    }

    respuestaUsuario = Number(prompt("¿Que producto desea agregar al carrito? \n1.Remera \n2.Pantalon \n3.Buzo\n4.Campera\n0.Salir"));
}

mostrarCarrito();


// Practica

/*let miOpcion = generarOpcion();
let respuesta = prompt("piedra")

while(seguimosJugando) {
    switch(respuesta){
        case "piedra": 
                if(miOpcion == "papel"){
                    ganeYo();
                } else if(miOpcion == "tijera") {
                    perdiYo();
                } else empatamos();
            break;
        case "tijera":
            break;
        case "papel":
            break;
        default:
                
            break;
    }
}


function ganeYo() {
    console.log();
    if(rondasGanadasPorMi == 3) {
        console.log();
        seguimosJugando = false;
    }
}*/

// let gradosCelsius = prompt("Escribe los grados Celsius");

// let gradosFarenheit = celsiusAFarenheit()

// function celsiusAFarenheit(gradosCelsius) {
//     let gradosFarenheit = gradosCelsius * 1.8 + 32;
//     return gradosFarenheit;
// }

// console.log("Los grados Farenheit son: " + gradosFarenheit);

// let precio = Number(prompt("¿Cuanto costo la cena?"));
// let propina = calcularPropina(precio);

// function calcularPropina(precio) {
//     let propina = precio * 0.1;
//     return propina;
// };

// console.log("La propina que tenes que dejar es de: " + propina);



// Lista de tareas pendientes que permita agregar, eliminar y marcar tareas como completadas.

function Tarea(trabajo, horas, boolCompletado) {
    this.trabajo = trabajo;
    this.horas = horas;
    this.boolCompletado = boolCompletado;
  }

  const tareaAlbanil = new Tarea("Albañil", 8, true);
  const tareaFotografo = new Tarea("Fotografo", 8, false);
  const tareaProgramador = new Tarea("Programador", 8, true);


let tareasPendientes = [tareaAlbanil, tareaFotografo];
let respuestaUsuario1 = prompt("¿Queres agregar la tarea de programador? \n1-Si \n2-No");

if(resrespuestaUsuario1 == "1") {
    agregarTarea(tareaProgramdor);
} else {
    console.log("ok");
}

function agregarTarea(tarea) {
    tareasPendientes.push(tarea);
}

function eliminarTarea(tarea) {
    tareasPendientes.pop(tarea);
    tareasCompletadas.push(tarea);
}

function mostrarTareas() {
    console.log("\n\n\TAREAS\n\n")
    for(i=0; i < tareasPendientes.length; i++) {
        console.log("Trabajo: " + carritareasPendientes[i].trabajo + "\nHoras: " + tareasPendientes[i].horas + "\n\n");
    }
}

mostrarTareas();






