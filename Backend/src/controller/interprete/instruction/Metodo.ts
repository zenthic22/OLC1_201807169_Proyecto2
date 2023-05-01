import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';
import { Instruction } from '../abstract/Instruction';

export class Metodo extends Instruction {
    constructor(
        public id: string,
        public statement: Instruction,
        public parametros: [],
        public subrutina: string,
        line: number,
        column: number,
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        
    }
}