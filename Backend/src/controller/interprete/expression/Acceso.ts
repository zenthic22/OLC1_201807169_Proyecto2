import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

export class Acceso extends Expression {
    constructor(public id:string, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        let value = env.getVar(this.id);
        //console.log("acceso: ",value?.valor);
        if(value != null) {
            return { value: value.valor, type: value.type };
        } else {
            return { value: null, type: Type.NULL }
        }
    }
}