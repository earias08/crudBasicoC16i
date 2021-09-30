// este archivo tendra toda la logica del ABM o CRUD
let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let formulario = document.querySelector("#formProducto");
//  console.log(formulario);

producto.addEventListener("blur", () => {
    validarCampoRequerido(producto);
  });