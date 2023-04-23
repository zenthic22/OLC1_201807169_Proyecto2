import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class Return extends Instruction {
    constructor(
        line: number,
        column: number,
        public retorno?: Expression
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        if(this.retorno != null || this.retorno != undefined) {
            const r = this.retorno.execute(env);
            return { value: r.value, type: 'Return', tipo:r.type, line: this.line, column: this.column }
        }
        return { value: undefined, type: 'Return', line: this.line, column: this.column }
    }
}