import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';

export class Declarar extends Instruction {
    private id: string[];
    private valor: Expression | null;
    private tipo: number;

    constructor(
        tipo: number,
        id: string[],
        valor: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
    }

    public execute(env: Environment): any {
        for(const actual of this.id) {
            let val = this.valor?.execute(env);
            if(this.valor == null) {
                env.guardar(actual, val?.value, this.tipo, this.line, this.column);
            } else if(this.tipo == 0 && val?.type == 1) {
                env.guardar(actual, val.value, val.type, this.line, this.column);
            } else if(this.tipo == 1 && val?.type == 0) {
                env.guardar(actual, val.value, val.type, this.line, this.column);
            } else if(this.tipo == val?.type) {
                env.guardar(actual, val.value, val.type, this.line, this.column);
            }
             else {
                env.guardar(actual, null, this.tipo, this.line, this.column);
            }
        }
    }
}