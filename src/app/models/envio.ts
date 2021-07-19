export class Envio {

    private id: number;
    private tipo_envio_id: number;
    private provincia_id: number;
    private localidad_id: number;
    private barrio: string;
    private calle: string;
    private altura: number;
    private cod_postal: string;
    private dpto: string;
    private obs: string;

    constructor(id: number, tipo_envio_id: number, prov: number, loc: number, barrio: string, calle: string, altura: number,
                cp: string, dpto: string, obs: string) {    
        
        this.id = id,
        this.tipo_envio_id = tipo_envio_id,
        this.provincia_id = prov,
        this.localidad_id = loc,
        this.barrio = barrio,
        this.calle = calle,
        this.altura = altura,
        this.cod_postal = cp,
        this.dpto = dpto,
        this.obs = obs
    }

}