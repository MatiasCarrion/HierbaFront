export class Usuario {

    private _id: number;
    private _nombre: string;

    constructor(id: number, nombre: string) {    
        this._id = id;
        this._nombre = nombre;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get nombre_1(): string {
        return this._nombre;
    }
    public set nombre_1(value: string) {
        this._nombre = value;
    }

}