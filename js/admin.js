import {
  validarCampoRequerido,
  validarCodigo,
  validarURL,
  validarGeneral,
  validarNumeros,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";

// declarar variables
let listaProductos = [];
let productoExistente = false; //false -> tengo que agregar un producto nuevo, true -> tengo que modificar
// este archivo tendra toda la logica del ABM o CRUD
let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let formulario = document.querySelector("#formProducto");
let btnAgregar = document.querySelector("#btnAgregar");
let btnDatosPrueba = document.querySelector('#btnDatosPrueba');
  console.log(btnDatosPrueba);

producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
url.addEventListener("blur", () => {
  validarURL(url);
});
formulario.addEventListener("submit", guardarProducto);
btnAgregar.addEventListener("click", limpiarFormulario);
btnDatosPrueba.addEventListener("click", cargarDatosDePrueba);

// verificar si hay datos en localstorage
cargaInicial();

function guardarProducto(e) {
  e.preventDefault();
  // validar los datos del formulario
  if (validarGeneral()) {
    // tengo que modificar o tengo que agregar uno nuevo
    // if(productoExistente)
    if (productoExistente == true) {
      //modificar
      actualizarProducto();
    } else {
      //agregar
      // crear un nuevo producto
      console.log("aqui deberia crear un producto");
      agregarProducto();
    }
  } else {
    console.log("aqui solo mostrar el cartel de error");
  }
}

function agregarProducto() {
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  // console.log(productoNuevo);
  // guardar el producto en el arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  // guardar en localstorage
  localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));
  // limpiar el formulario
  limpiarFormulario();
  // dibujar fila en la tabla
  crearFila(productoNuevo);
  //mostrar un mensaje al usuario
  Swal.fire(
    "Producto agregado",
    "El producto fue correctamente agregado",
    "success"
  );
}

function cargaInicial() {
  // si hay algo en localstorage lo guardo en arreglo sino dejo el arreglo vacio.
  listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || [];
  console.log(listaProductos);

  // llamar a la funcion que crea filas
  listaProductos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
}

function crearFila(itemProducto) {
  console.log(itemProducto);
  // traigo el nodo padre que seria el tbody
  let tabla = document.querySelector("#tablaProductos");
  // console.log(tabla);
  tabla.innerHTML += `<tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombreProducto}</td>
  <td>${itemProducto.descripcion}</td>
  <td>${itemProducto.cantidad}</td>
  <td>${itemProducto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararEdicionProducto(${itemProducto.codigo})">Editar</button>
    <button class="btn btn-danger" onclick="eliminarProducto(${itemProducto.codigo})">Borrar</button>
  </td>
</tr>`;
}

function limpiarFormulario() {
  // limpia los value de los elementos del form
  formulario.reset();
  // limpiar las clases de cada elemento del form
  codigo.className = "form-control";
  // tarea terminar de limpiar todos los inputs
  productoExistente = false;
}

//funcion invocada desde el html
window.prepararEdicionProducto = (codigo) => {
  // console.log(codigo);
  // buscar el objeto dentro del arreglo
  let productoEncontrado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  // console.log(productoEncontrado);
  //mostrar los datos del objeto en formulario
  document.querySelector("#codigo").value = productoEncontrado.codigo;
  document.querySelector("#producto").value = productoEncontrado.nombreProducto;
  document.querySelector("#descripcion").value = productoEncontrado.descripcion;
  document.querySelector("#cantidad").value = productoEncontrado.cantidad;
  document.querySelector("#url").value = productoEncontrado.url;

  // cambiar el valor de la variable bandera para editar
  productoExistente = true;
};

function actualizarProducto() {
  // console.log("aqui tengo que modificar los productos");
  // console.log(codigo.value);
  Swal.fire({
    title: "¿Esta seguro que desea editar el producto?",
    text: "No puede revertir posteriormente este proceso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "si",
    cancelButtonText: "cancelar",
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      //aqui es donde procedemos a editar
      //buscar la posicion del objeto con el codigo indicado
      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo == codigo.value;
      });

      // actualizar los valores del objeto encontrado dentro de mi arreglo
      listaProductos[indiceProducto].nombreProducto =
        document.querySelector("#producto").value;
      listaProductos[indiceProducto].descripcion =
        document.querySelector("#descripcion").value;
      listaProductos[indiceProducto].cantidad =
        document.querySelector("#cantidad").value;
      listaProductos[indiceProducto].url = document.querySelector("#url").value;

      console.log(listaProductos[indiceProducto]);
      // actualizar el localstorage
      localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));
      // actualizar la tabla
      borrarFilas();
      listaProductos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });
      //limpiar el formulario
      limpiarFormulario();

      // mostrar un mensaje que el producto fue editado
      Swal.fire("Producto editado", "Su producto fue correctamente editado", "success");
    }
  });
}

function borrarFilas() {
  // traigo el nodo padre que seria el tbody
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML = "";
}


window.eliminarProducto = (codigo)=> {
  console.log(codigo);
  Swal.fire({
    title: '¿Esta seguro de borrar el producto?',
    text: "No se puede revertir este proceso posteriormente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, borrar',
    cancelButtonText: 'cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // aqui el codigo si quiero borrar
      // op1 usar splice(indice, 1), para obtener el indice puedo usar findindex
      // op2
      let _listaProductos = listaProductos.filter((itemProducto)=>{return itemProducto.codigo != codigo})
      console.log(_listaProductos);
      // actualizar el arreglo y el localstorage
      listaProductos = _listaProductos;
      localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));
      // borramos la tabla
      borrarFilas();
      //vuelvo a dibujar la tabla 
      listaProductos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });
      // muestro el mensaje
      Swal.fire(
        'Producto eliminado',
        'El producto fue correctamente eliminado',
        'success'
      )
    }
  })
}

function cargarDatosDePrueba(){
  const datos = [
    {
      codigo: "994",
      nombreProducto: "Kakashi Hatake (Anbu)",
      cantidad: "1",
      descripcion:
        "Funko Figura Pop Naruto Shippuden Kakashi Hatake (Anbu) (AAA Anime Exclusive)",
      url: "https://m.media-amazon.com/images/I/51Mkr80aQqL._AC_SL1092_.jpg",
    },
    {
      codigo: "933",
      nombreProducto: "Shikamaru Nara",
      cantidad: "1",
      descripcion: "Naruto shippuden",
      url: "https://m.media-amazon.com/images/I/51BitznofnL._AC_SL1300_.jpg",
    },
    {
      codigo: "184",
      nombreProducto: "Tobi",
      cantidad: "1",
      descripcion:
        "Figura de Tobi de Naruto Shippuden de la marca FunKo POP Anime",
      url: "https://m.media-amazon.com/images/I/51-H7QOsVES._AC_SL1200_.jpg",
    },
    {
      codigo: "729",
      nombreProducto: "Orochimaru",
      cantidad: "1",
      descripcion: "Orochimaru Figura Coleccionable, Multicolor (46628)",
      url: "https://m.media-amazon.com/images/I/610cunP4zOL._AC_SL1200_.jpg",
    },
    {
      codigo: "073",
      nombreProducto: "Jiraiya On Toad",
      cantidad: "1",
      descripcion:
        "Jiraiya On Toad Anime Figura De Acción Juguetes 73 Colección Modelo De Personaje Estatua 10 Cm En Caja",
      url: "https://m.media-amazon.com/images/I/61sLJuTZxBS._AC_SL1500_.jpg",
    },
    {
      codigo: "728",
      nombreProducto: "Gaara ",
      cantidad: "1",
      descripcion: "Gaara Figura Coleccionable, Multicolor (46627)",
      url: "https://m.media-amazon.com/images/I/616YRHWRZwL._AC_SL1200_.jpg",
    },
    {
      codigo: "182",
      nombreProducto: "Kakashi Figure",
      cantidad: "1",
      descripcion:
        'Funko FM-B01M5KD9Y6 Naruto Shippuden 12450"POP Vinyl Kakashi Figure',
      url: "https://m.media-amazon.com/images/I/617XvrkXkEL._AC_SL1360_.jpg",
    },
  ];

  if(!localStorage.getItem('listaProductosKey')){
    // quiero agregar los datos de prueba
    console.log('Aqui cargo datos de prueba');
    // actualizar el arreglo y el localstorage
    localStorage.setItem('listaProductosKey', JSON.stringify(datos))
    listaProductos = datos;
    // mostrarlos en la tabla
    listaProductos.forEach(itemProducto => { crearFila(itemProducto) })
  }else{
    // no quiero hacer nada si tiene datos
    console.log('Aqui no hago nada');
  }
}