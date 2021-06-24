export class Categoria {

    private _id: number;
    private _nombre: string;
    
    constructor (id:number, nombre:string){
        this._id = id;
        this._nombre = nombre;
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
}