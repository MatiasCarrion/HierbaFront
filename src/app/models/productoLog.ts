export class ProductoLog {

    private _id: number;
    private _productoId: number;
    private _categoriaId: number;
    private _proveedorId: number;
    private _precioCompra: number;
    private _minGanancia: number;
    private _maxGanancia: number;
    private _precioVenta: number;
    private _existencia: number;
    private _stock: number;
    private _accionId: number;
    private _usuarioId: number;
    private _creadoEl: Date;

    constructor(id: number, productoId: number, categoriaId: number,
        proveedorId: number, precioCompra: number, minGanancia: number,
        maxGanancia: number, precioVenta: number, existencia: number, stock: number,
        accionId: number, usuarioId: number, creadoEl: Date) {

        this._id = id;
        this._productoId = productoId;
        this._categoriaId = categoriaId;
        this._proveedorId = proveedorId;
        this._precioCompra = precioCompra;
        this._minGanancia = minGanancia;
        this._maxGanancia = maxGanancia;
        this._precioVenta = precioVenta;
        this._existencia = existencia;
        this._stock = stock;
        this._accionId = accionId;
        this._usuarioId = usuarioId;
        this._creadoEl = creadoEl;

    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get productoId(): number {
        return this._productoId;
    }
    public set productoId(value: number) {
        this._productoId = value;
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
    public get existencia(): number {
        return this._existencia;
    }
    public set existencia(value: number) {
        this._existencia = value;
    }
    public get stock(): number {
        return this._stock;
    }
    public set stock(value: number) {
        this._stock = value;
    }
    public get accionId(): number {
        return this._accionId;
    }
    public set accionId(value: number) {
        this._accionId = value;
    }
    public get usuarioId(): number {
        return this._usuarioId;
    }
    public set usuarioId(value: number) {
        this._usuarioId = value;
    }
    public get creadoEl(): Date {
        return this._creadoEl;
    }
    public set creadoEl(value: Date) {
        this._creadoEl = value;
    }
}