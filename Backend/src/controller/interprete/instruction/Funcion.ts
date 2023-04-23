import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';
import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';

export class Funcion extends Instruction {
    constructor(
        private tipo: Type,
        private id: string,
        public parametros: Array<Expression>,
        public statement: Instruction,
        line: number,
        column: number,
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        env.guardarFuncion(this.id, this);
    }
}