import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class DoWhile extends Instruction {
    constructor(
        private condicion: Expression,
        private cuerpo: Instruction,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        let value = this.condicion.execute(env);
        if(value.type != Type.BOOLEAN) {
            let err = console.log("la condicion a evaluar no de tipo boolean");
        }

        let limit = 0;
        while(true) {
            const retorno = this.cuerpo.execute(env);
            if(retorno != null && retorno != undefined) {
                if(retorno.type == 'Break') {
                    break;
                } else if(retorno.type == 'Continue') {
                    continue;
                }
            }
            value = this.condicion.execute(env);
            limit++;
            if(limit == 10000 || !value.value) {
                break;
            }
        }
        if(limit == 10000) {
            let err = console.log("limite de iteraciones While");
            throw err;
        }
    }
}