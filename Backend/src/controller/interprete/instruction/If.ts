import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class If extends Instruction {
    constructor(
        private condicion: Expression,
        private cuerpo: Instruction,
        private contrario: Instruction,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        const value = this.condicion.execute(env);
        if(value.type != Type.BOOLEAN) {
            let er = console.log("la condicion a evaluar en el if no es de tipo boolean")
        }
        if(value.value) {
            return this.cuerpo.execute(env);
        } else if(this.contrario != null) {
            return this.contrario.execute(env);
        }
    }
}