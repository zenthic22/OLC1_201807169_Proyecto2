import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class While extends Instruction {
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
            let err = console.log("la condicion a evaluar no es de tipo boolean")
            throw err;
        }
        let limit = 0;
        while(value.value) {
            const retorno = this.cuerpo.execute(env);
            if(retorno != null && retorno != undefined) {
                if(retorno.type == 'Break') {
                    break;
                } else if(retorno.type == 'Continue') {
                    continue;
                } else if(retorno.type == 'Return' && retorno.value == undefined) {
                    break;
                }
                else if(retorno.type == 'Return' && retorno.value != undefined) {
                    return { value: retorno.value, type: retorno.type }
                    break;
                } else if(retorno.type == 'Return' && retorno.value == undefined) {
                    break;
                }
            }
            value = this.condicion.execute(env);
            if(limit == 10000) {
                let er = console.log("limite de iteraciones While");
            }
        }
    }
}