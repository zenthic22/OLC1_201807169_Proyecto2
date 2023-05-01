import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';

export class Length extends Instruction {
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
        let len = this.value.execute(env);
        try {
            let lenret = len.value.length;
            if(len.tamanio != null || len.tamanio != undefined) {
                return { value: len.tamanio, type: Type.INT }
            } else if(lenret != undefined) {
                return { value: lenret, type: Type.INT }
            } else {
                throw "error en funcion length";
            }
        } catch(error) {
            throw "error para esta funcion";
        }
    }
}