import { Type } from "../abstract/Return";

export class Mi_var {
    constructor(public nombre:string, public tipo:any, public valor:any) {
    }

    public obtener_valor() {
        console.log("nombre: "+this.nombre+" tipo: "+this.nombre+" valor: "+this.valor);
    }
}