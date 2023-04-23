import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class Caso {
    public linea: number;
    public column: number;
    public instrcciones: Instruction[];
    public expression: Expression;
    constructor(caso: Expression, code: Instruction[], line: number, column: number) {
        this.linea = line;
        this.column = column;
        this.instrcciones = code;
        this.expression = caso;
    }
    
    public getInstruction(): Instruction[] {
        return this.instrcciones;
    }

    public getExpression(): Expression {
        return this.expression;
    }
}