'use strict'

//Agrupamos todas la variables
const carrito = document.querySelector('#carrito');
const listaBici = document.querySelector('#lista-bici');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//Listener
cargarEventListeners();

//Agrupamos todas las funciones
function cargarEventListeners() {

  listaBici.addEventListener('click', agregar)

  carrito.addEventListener('click', eliminar);

  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //Resetea el arreglo
    limpiarHTML(); //Limpia el HTML

  });

}

//Funciones
function agregar(e) {
  e.preventDefault(); //para que no salte hacia arriba cuando es un enlace #
  if (e.target.classList.contains('agregar')) { //Esta linea es para que se activie exclusivamente al hacer click en el boton
    console.log('agregado');
    const biciSeleccionada = e.target.parentElement;
    leerDatosBici(biciSeleccionada);
  }
}

//Eliminar un curso del carrito
function eliminar(e){
  if(e.target.classList.contains('borrar')){
    const biciId = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( biciSeleccionada => biciSeleccionada.id !== biciId);

    carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
  }
}

//Leer el contenido del HTML al que le dimos click y extrae la inf de la bici
function leerDatosBici(biciSeleccionada) {
  //console.log(biciSeleccionada);

  //Crear un objeto con el contenido de la bici biciSeleccionada
  const infoBici = {
    id: biciSeleccionada.querySelector('button').getAttribute('data-id'),
    imagen: biciSeleccionada.querySelector('img').src,
    titulo: biciSeleccionada.querySelector('h6').textContent,
    modelo: biciSeleccionada.querySelector('p').textContent,
    precio: biciSeleccionada.querySelector('span').textContent,
    cantidad: 1
  }

//Revisar si un elemento ya existe en el carrito
const existe = articulosCarrito.some(biciSeleccionada => biciSeleccionada.id === infoBici.id);
if(existe){
  //Actualizar la cantidad
  const bicicletas = articulosCarrito.map(biciSeleccionada => {//.map crea un nuevo arreglo
    if(biciSeleccionada.id === infoBici.id){
      biciSeleccionada.cantidad++;
      return biciSeleccionada;     //retorna el objeto actualizado
    }else{
      return biciSeleccionada;//retorna los objetos que no son dubplicados.
    }
  })
  articulosCarrito = [...bicicletas];
}else{
  //Agrega elementos al arreglo de Carrito
  //... para agregar una copia de
  articulosCarrito = [...articulosCarrito, infoBici];
}




  console.log(articulosCarrito);

  carritoHTML(); //Llamada a la funcion
}

//Muestra el carrito en el html
function carritoHTML() {
  //Limpiar el html
  limpiarHTML();

  //Recorre el carrito y genera el html
  articulosCarrito.forEach(biciSeleccionada => {
    const row = document.createElement('tr');
    row.innerHTML = `

    <td><img src="${biciSeleccionada.imagen}" width="100"></td>
    <td>${biciSeleccionada.titulo}</td>
    <td>${biciSeleccionada.precio}</td>
    <td>${biciSeleccionada.cantidad}</td>
    <td><a href="#" class="borrar" data-id="${biciSeleccionada.id}"> X </a></td>

    `;

    //Agrega el HTML del carrito al tbody
    //listaCarrito esta declarado arriba del todo
    listaCarrito.appendChild(row);
  });
}

//Elimina los cursos acumulados del tbody
function limpiarHTML() {
  //Forma lenta
  //listaCarrito.innerHTML ='';
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild)
  }

}
