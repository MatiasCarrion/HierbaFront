export class Producto {

    private _id: number;  
    private _nombre: string;
    private _categoriaId: number;
    private _proveedorId: number;
    private _precioCompra: number;
    private _minGanancia: number;
    private _maxGanancia: number;
    private _precioVenta: number; 
    private _stock: number;
    
    constructor(id:number, nombre: string, categoriaId:number, 
                proveedorId: number, precioCompra:number, minGanancia:number, 
                maxGanancia: number, precioVenta: number, stock:number) {

            this._id = id;
            this._nombre = nombre;
            this._categoriaId = categoriaId;
            this._proveedorId = proveedorId;
            this._precioCompra = precioCompra;
            this._minGanancia = minGanancia;
            this._maxGanancia = maxGanancia;
            this._precioVenta = precioVenta;
            this._stock = stock;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
    public get categoriaId(): number {
        return this._categoriaId;
    }
    public set categoriaId(value: number) {
        this._categoriaId = value;
    }
    public get proveedorId(): number {
        return this._proveedorId;
    }
    public set proveedorId(value: number) {
        this._proveedorId = value;
    }
    public get precioCompra(): number {
        return this._precioCompra;
    }
    public set precioCompra(value: number) {
        this._precioCompra = value;
    }
    public get minGanancia(): number {
        return this._minGanancia;
    }
    public set minGanancia(value: number) {
        this._minGanancia = value;
    }
    public get maxGanancia(): number {
        return this._maxGanancia;
    }
    public set maxGanancia(value: number) {
        this._maxGanancia = value;
    }
    public get precioVenta(): number {
        return this._precioVenta;
    }
    public set precioVenta(value: number) {
        this._precioVenta = value;
    }
    public get stock(): number {
        return this._stock;
    }
    public set stock(value: number) {
        this._stock = value;
    }

}