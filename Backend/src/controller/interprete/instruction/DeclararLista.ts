import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';

export class DeclararLista extends Instruction {
    private id: string[];
    private value: Expression[];
    private tipo: number;
    private tipo2: number;

    constructor(
        tipo1: number,
        id: string[],
        tipo2: number,
        value: Expression[],
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.tipo = tipo1;
        this.tipo2 = tipo2;
        this.value = value;
    }

    public execute(env: Environment) {
        for(const actual of this.id) {
            if(this.value == null) {
                if(this.tipo == this.tipo2) {
                    env.guardar(actual,this.value,this.tipo,this.line,this.column,null,Type.LISTA);
                    console.log("lista tipo 1: "+this.id);
                } else {
                    throw "nop";
                }
            } else {
                env.guardar(actual,this.value,this.tipo,this.line,this.column,null,Type.LISTA);
                console.log("lista tipo 2: "+this.id);
            }
        }
    }
}