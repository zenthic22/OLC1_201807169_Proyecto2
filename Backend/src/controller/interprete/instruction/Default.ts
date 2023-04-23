import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class Default extends Instruction {
    constructor(
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        return { type: 'Default', line: this.line, column: this.column }
    }
}