export class DetalleVenta {

    private id: number;
    private prod_id: number;
    private cantidad: number;
    private precio_venta: number;

    constructor(id: number, prod_id: number, cantidad: number, precio_venta: number) {    
        this.id = id,
        this.prod_id = prod_id,
        this.cantidad = cantidad,
        this.precio_venta = precio_venta
    }
}