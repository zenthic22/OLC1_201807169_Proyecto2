import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

export class ToString extends Instruction {
    private value: Expression;

    constructor(
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(env: Environment): any {
        let to_cadena = this.value.execute(env);
        try {
            if(to_cadena.type == 0 || to_cadena.type == 2) {
                return { value: to_cadena.value.toString(), type: Type.STRING }
            } else {
                throw "no es posible convertir en cadena la variable";
            }
        } catch(error) {
            throw "error en funcion tostring";
        }
    }
}