const baseDeDatos = [
    {
        id: 1,
        nombre: 'Destroy all humans!',
        precio: 1200,
        imagen: 'img/imagen1.jpg'
    },
    {
        id: 2,
        nombre: 'Spider-Man Ultimate Edition',
        precio: 1200,
        imagen: 'img/imagen2.jpg'
    },
    {
        id: 3,
        nombre: 'Blazzblue Cross Tag Battle',
        precio: 1200,
        imagen: 'img/imagen3.jpg'
    },
    {
        id: 4,
        nombre: 'Shrek',
        precio: 1200,
        imagen: 'img/imagen4.jpg'
    }

];

let carrito = [];
var total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.textContent = info.precio + ' MXN';
        miNodoPrecio.classList.add('card-text');
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    renderizarCarrito();

}



/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio} MXN`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    DOMtotal.textContent = total.toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
// Inicio
renderizarProductos();
function grafica(){
var ctx= document.getElementById("myChart").getContext("2d");
var myChart= new Chart(ctx,{
type:"bar",
data:{
labels:['Destroy All humans','Spider-Man Ultimate Edition','Blazzblue Cross Tag Battle','Shrek','Total'],
datasets:[{
    label:'Precios',
    data:[preciopro1,preciopro2,preciopro3,preciopro4,total],
        backgroundColor:[
        'rgb(66, 134, 244,0.5)',
        'rgb(74, 135, 72,0.5)',
        'rgb(229, 89, 50,0.5)',
        'rgb(129, 89, 50,0.5)',
        'rgb(90,189, 50,0.5)'
        ]
    }]
},
actions: {
    name: 'Add Data',
    handler(chart) {
      const data = chart.data;
      if (data.datasets.length > 0) {
        data.labels = Utils.months({count: data.labels.length + 1});

        for (var index = 0; index < data.datasets.length; ++index) {
          data.datasets[index].data.push(Utils.rand(-100, 100));
        }

        chart.update();
    }
},
name: 'Remove Data',
handler(chart) {
  chart.data.labels.splice(-1, 1); // remove the label first

  chart.data.datasets.forEach(dataset => {
    dataset.data.pop();
  });

  chart.update();
}
},
options:{
    responsive: true,
scales:{
yAxes:[{
ticks:{
beginAtZero:true
}
}]
}
}
});
}
const DOMRecargar = document.querySelector('#recargar');

//Evento
DOMRecargar.addEventListener('click', recargargrafic);

//Funcion
function recargargrafic() {
    grafica();
}

var preciopro1 = 0;
var preciopro2 = 0;
var preciopro3 = 0;
var preciopro4 = 0;
const DOMButon1 = document.querySelector('#boton1');
DOMButon1.addEventListener('click', buton1);
function buton1() {
    preciopro1 = preciopro1 + 1200;
    console.log("sirve");
}
const DOMButon2 = document.querySelector('#boton2');
DOMButon2.addEventListener('click', buton2);
function buton2() {
    preciopro2 = preciopro2 + 1200;
    console.log("sirve");
}
const DOMButon3 = document.querySelector('#boton3');
DOMButon3.addEventListener('click', buton3);
function buton3() {
    preciopro3 = preciopro3 + 1200;
    console.log("sirve");
}
const DOMButon4 = document.querySelector('#boton4');
DOMButon4.addEventListener('click', buton4);
function buton4() {
    preciopro4 = preciopro4 + 1200;
    console.log("sirve");
}
//division
const DOMQuitar1 = document.querySelector('#quitar1');
DOMQuitar1.addEventListener('click', quitar1);
function quitar1() {
    preciopro1 = preciopro1 - 1200;
    console.log("resta");
}
const DOMQuitar2 = document.querySelector('#quitar2');
DOMQuitar2.addEventListener('click', quitar2);
function quitar2() {
    preciopro2 = preciopro2 - 1200;
    console.log("resta");
}
const DOMQuitar3 = document.querySelector('#quitar3');
DOMQuitar3.addEventListener('click', quitar3);
function quitar3() {
    preciopro3 = preciopro3 - 1200;
    console.log("resta");
}
const DOMQuitar4 = document.querySelector('#quitar4');
DOMQuitar4.addEventListener('click', quitar4);
function quitar4() {
    preciopro4 = preciopro4 - 1200;
    console.log("resta");
}