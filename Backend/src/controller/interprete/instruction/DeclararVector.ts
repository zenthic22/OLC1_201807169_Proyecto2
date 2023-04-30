import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";

export class DeclararVector extends Instruction {
    private id: string[];
    private value: Expression[] | null;
    private tipo: number;
    private tamanio?: Expression;
    private tipoL?: number;

    constructor(
        tipo: number,
        id: string[],
        value: Expression[],
        line: number,
        column: number,
        tamanio?: Expression,
        tipoL?: number,
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipo = tipo;
        this.tamanio = tamanio;
        this.tipoL = tipoL;
    }

    public execute(env: Environment) {
        for(const actual of this.id) {
            if(this.value == null) {
                if(this.tipo == this.tipoL) {
                    let tam = this.tamanio?.execute(env);
                    env.guardar(actual,[],this.tipo,this.line,this.column,tam?.value,Type.VECTOR);
                    console.log("vector declarado tipo 1: "+this.id);
                    console.log("tamaño del vector tipo 1: "+tam?.value);
                } else {
                    throw "nop";
                }
            } else {
                let tam = this.value.length;
                console.log("vector declarado tipo 2: "+this.id);
                console.log("tamaño del vector tipo 2: "+tam);
                env.guardar(actual,this.value,this.tipo,this.line,this.column,tam,Type.VECTOR);
            }
        }
    }
}