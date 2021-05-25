export class Producto {
    id: number;
    nombre: String;
    categoria: String;
    cantidad: number;


constructor (id:number,nombre:String,categoria:String,cantidad:number){
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.cantidad = cantidad;
    }    
}