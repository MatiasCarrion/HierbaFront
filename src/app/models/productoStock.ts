export class ProductoStock {
    private _id: number;
    private _nombre: String; 
    private _categoria: String;
    private _stock: number;
    private _precioCompra: number;
    private _precioVenta: number;
    private _stockMaximo: number;   
    
    
constructor (id:number,nombre:String,categoria:String,cantidad:number,precioCompra:number,precioVenta:number, stockMax:number){
    this._id = id;
    this._nombre = nombre;
    this._categoria = categoria;
    this._stock = cantidad;
    this._precioCompra = precioCompra;
    this._precioVenta = precioVenta;
    this._stockMaximo = stockMax;
    }  
    
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nombre(): String {
        return this._nombre;
    }
    public set nombre(value: String) {
        this._nombre = value;
    }
    public get categoria(): String {
        return this._categoria;
    }
    public set categoria(value: String) {
        this._categoria = value;
    }

    public get stock(): number {
        return this._stock;
    }
    public set stock(value: number) {
        this._stock = value;
    }

    public get precioCompra(): number {
        return this._precioCompra;
    }
    public set precioCompra(value: number) {
        this._precioCompra = value;
    }

    public get precioVenta(): number {
        return this._precioVenta;
    }
    public set precioVenta(value: number) {
        this._precioVenta = value;
    }
    public get stockMaximo(): number {
        return this._stockMaximo;
    }
    public set stockMaximo(value: number) {
        this._stockMaximo = value;
    }
}

