import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

export class Acceso extends Expression {
    constructor(public id:string, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        const value = env.getVar(this.id);
        console.log("acceso: ",this.id);
        if(value != null) {
            console.log("valores: "+value.valor);
            return { value: value.valor, type: value.type, tamanio:value.tamanio, edd:value.edd };
        } else {
            return { value: null, type: Type.NULL }
        }
    }
}