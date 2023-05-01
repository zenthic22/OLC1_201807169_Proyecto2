import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

export class Ternario extends Instruction {
    private condicion: Expression;
    private retorno1: Expression;
    private retorno2: Expression;

    constructor(
        condicion: Expression,
        retorno1: Expression,
        retorno2: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.condicion = condicion;
        this.retorno1 = retorno1;
        this.retorno2 = retorno2;
    }

    public execute(env: Environment) {
        let resCondicion = this.condicion.execute(env);
        let ret1 = this.retorno1.execute(env);
        let ret2 = this.retorno2.execute(env);
        try {
            if(resCondicion.value) {
                return { value: ret1.value, type: ret1.type }
            } else {
                return { value: ret2.value, type: ret2.type }
            }
        }catch(error) {
            throw "operacion ternaria no valida";
        }
    }
}