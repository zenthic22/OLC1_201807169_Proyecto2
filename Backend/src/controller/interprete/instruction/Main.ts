import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { LlamadaFuncion } from '../instruction/LlamadaFuncion';

export class Main extends Instruction {
    constructor(
        private funcioninicial: LlamadaFuncion,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        this.funcioninicial.execute(env);
    }
}