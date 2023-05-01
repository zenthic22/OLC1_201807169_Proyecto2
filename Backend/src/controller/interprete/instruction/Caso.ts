import { Expression } from "../abstract/Expression";
import { Environment } from "../abstract/Environment";
import { Instruction } from "../abstract/Instruction";

export class Caso {
    public linea: number;
    public column: number;
    public instrucciones: Instruction[];
    public expresion: Expression;

    constructor(
        caso: Expression,
        code: Instruction[],
        line: number,
        column: number
    ) {
        this.linea = line;
        this.column = column;
        this.instrucciones = code;
        this.expresion = caso;
    }

    public getInstruction(): Instruction[] {
        return this.instrucciones
    }

    public getExpression(): Expression {
        return this.expresion;
    }
}