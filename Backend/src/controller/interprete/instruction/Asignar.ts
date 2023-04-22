import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Type } from "../abstract/Return";

export class Asignar extends Instruction {
    private id: string;
    private value: Expression;

    constructor(
        id: string,
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(env: Environment) {
        let variableOriginal = env.getVar(this.id);
        console.log(variableOriginal);
        let nuevoValor = this.value.execute(env);
        if(variableOriginal != null) {
            if(variableOriginal.type == 0 && nuevoValor.type == 1) {
                variableOriginal.type = 1;
                variableOriginal.valor = nuevoValor.value;
            } else if(variableOriginal.type == 1 && nuevoValor.type == 0) {
                variableOriginal.type = 0;
                variableOriginal.valor = nuevoValor.value;
            } else if(variableOriginal.type == nuevoValor.type) {
                variableOriginal.valor = nuevoValor.value;
            } else {
                console.log("error");
            }
        }
    }
}