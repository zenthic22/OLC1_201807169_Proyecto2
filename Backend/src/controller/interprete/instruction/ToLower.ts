import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';

export class ToLower extends Instruction {
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
        let tostr = this.value.execute(env);
        let stringretornar = tostr.value.toString();
        if(stringretornar) {
            stringretornar = stringretornar.toLowerCase();
            return { value: stringretornar, type: tostr.type }
        }
    }
}