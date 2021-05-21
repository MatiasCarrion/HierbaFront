export class Stock {
    id: number;
    nombre: String;
    categoria: String;
    stock: number;


constructor (id:number,nombre:String,categoria:String,stock:number){
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.stock = stock;
    }    
}