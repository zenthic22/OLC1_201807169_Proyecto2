import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';

export class Typeof extends Instruction {
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
        let tipo = this.value.execute(env);
        try {
            if(tipo != null && tipo != undefined) {
                if(tipo.edd == Type.VECTOR) {
                    return { value: "vector", type: Type.STRING }
                } else if(tipo.edd == Type.LISTA) {
                    return { value: "lista", type: Type.STRING }
                } else if(tipo.type == 0) {
                    return { value: "int", type: Type.STRING }
                } else if(tipo.type == 1) {
                    return { value: "double", type: Type.STRING }
                } else if(tipo.type == 2) {
                    return { value: "boolean", type: Type.STRING }
                } else if(tipo.type == 3) {
                    return { value: "char", type: Type.STRING }
                } else if(tipo.type == 4) {
                    return { value: "string", type: Type.STRING }
                }
            } else {
                throw "error en recuperacion";
            }
        } catch(error) {
            throw "error en typeof";
        }
    }
}