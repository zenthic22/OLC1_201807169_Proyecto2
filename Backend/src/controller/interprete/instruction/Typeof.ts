import { Expression } from '../abstract/Expression';
import { Funcion } from './Funcion';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

let contador:number = 0;

export class Typeof extends Instruction {
    constructor(
        public expresion: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
    }
}