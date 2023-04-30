import { Expression } from '../abstract/Expression';
import { Funcion } from './Funcion';
import { Instruction } from '../abstract/Instruction';
import { Return, Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

export class Retorno extends Expression {
    constructor(
        public expresion: Expression,
        line: number,
        column: number,
    ) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        let resultado: Return;
        resultado = resultado = { value:("error de operacion"), type: Type.STRING }
        return resultado;
    }
}