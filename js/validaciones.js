export function validarCampoRequerido(input) {
  // console.log(input);
  console.log(input.value);
  if (input.value.trim().length > 0 && input.value.trim().length >= 3) {
    console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato erroneo");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarNumeros(input) {
  // validar con expresiones regulares
  let patron = /^[0-9]{1,5}$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarCodigo(input) {
  // validar que tenga almenos 3 caracteres
  if (input.value.trim() != "" && input.value.trim().length >= 3) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarURL(input) {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (input.value.trim() != "" && patron.test(input.value.trim())) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarGeneral() {

  // console.log('desde validar general');
  // console.log(e);
  // if(true)
  let alerta = document.querySelector('#msjAlerta');
  if (
    validarCodigo(document.querySelector("#codigo")) &&
    validarCampoRequerido(document.querySelector("#producto")) &&
    validarCampoRequerido(document.querySelector("#descripcion")) &&
    validarNumeros(document.querySelector("#cantidad")) &&
    validarURL(document.querySelector("#url"))
  ) {
    console.log("validacion correcta");
    alerta.className = 'alert alert-danger mt-4 d-none';
    return true;
  } else {
    console.log("validacion erronea");
    alerta.className = 'alert alert-danger mt-4';
    return false;
  }
}

