import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";
import { Primitivo } from "../expression/Primitivo";
import { TipoPrimitivo } from "../utils/TipoPrimitivo";

export class DeclararListaChar extends Instruction {
    private id: string[];
    private value: Expression;
    private tipo: number;

    constructor(
        tipo: number,
        id: string[],
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.value = value;
    }

    public execute(env: Environment) {
        for(const actual of this.id) {
            if(this.tipo == 3) {
                const listachar = this.value.execute(env);
                if(listachar.type == 4) {
                    env.guardar(actual,[],this.tipo,this.line,this.column,null,Type.LISTA);
                    console.log("lista caracter: "+this.id);
                    const variableOriginal = env.getVar(actual);
                    const varaux = listachar.value.split('');
                    for(let i=0; i<varaux.length; i++) {
                        var aux = new Primitivo(varaux[i],TipoPrimitivo.CHAR, this.line,this.column);
                        variableOriginal?.valor.push(aux);
                    }
                } else {
                    throw "nop"
                }
            } else { 
                throw "nop2"
            }
        }
    }
}