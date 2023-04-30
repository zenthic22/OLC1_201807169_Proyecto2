import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

let contador: number = 0;

export class Main extends Instruction {
    constructor(
        private id: string,
        private expresiones: Array<Expression>, 
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        
    }
}