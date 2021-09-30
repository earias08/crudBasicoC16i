// este archivo tendra todo lo necesario para trabajar con la clase de productos
export class Producto{
    constructor(codigo, producto, descripcion, cantidad, url){
        this.codigo = codigo;
        this.nombreProducto = producto;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.url = url;
    }
}