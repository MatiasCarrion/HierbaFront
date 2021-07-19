export class Venta {
    private detalle_venta_id: number;
    private datos_envio_id: number;
    private monto_parcial: number;
    private descuento: number;
    private monto_final: number;
    private tipo_descuento_id: number;
    private nombre_cliente: string;
    private dni_cliente: number;
    private telefono_cliente: number;
    private mail_cliente: string


constructor (detalle_venta_id: number, datos_envio_id: number, monto_parcial: number,
            descuento: number, monto_final: number, tipo_desc: number, nombre_cliente: string,
            dni_cliente: number, telef_cliente: number, mail_cliente: string){
    
        this.detalle_venta_id = detalle_venta_id,
        this.datos_envio_id = datos_envio_id,
        this.monto_parcial = monto_parcial,
        this.descuento = descuento,
        this.monto_final = monto_final,
        this.tipo_descuento_id = tipo_desc,
        this.nombre_cliente = nombre_cliente,
        this.dni_cliente = dni_cliente,
        this.telefono_cliente = telef_cliente,
        this.mail_cliente = mail_cliente
    }    
}