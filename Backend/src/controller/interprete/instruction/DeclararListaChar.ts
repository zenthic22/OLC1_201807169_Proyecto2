import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";
import { Primitivo } from "../expression/Primitivo";
import { TipoPrimitivo } from "../utils/TipoPrimitivo";
import { Union } from "../utils/Union";

let contador:number = 0;

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

    public getAST(): { codigorama: string; nombrenodo: string; } {
        let tipo = "BOOLEAN";
        if(this.tipo == 4) {
            tipo = "STRING";
        } else if(this.tipo == 0) {
            tipo = "INT";
        } else if(this.tipo == 1) {
            tipo = "DOUBLE";
        } else if(this.tipo == 3) {
            tipo = "CHAR";
        }
        let ids = "";
        let declaraciones = "";
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nododeclararlistachar"+aleatorio.toString();
        var val = {codigorama:"nodo",nombrenodo:"nodo[label =\"sinvalor\"]"}
        for (const actual of this.id) {
            ids += "nodoauxdeclarar"+actual+"[label =\"DECLARARLISTACHAR\"];\n";
            ids += "nodotipo"+nombreNodoP+actual+"[label=\"TIPO\"];\n";
            ids += "nodotipos"+nombreNodoP+actual+"[label="+tipo+"];\n";
            ids +="nodosis"+nombreNodoP+actual+"[label=\"ID\"];\n";
            ids +="nodosids"+nombreNodoP+actual+"[label="+actual+"];";
            ids += val.codigorama+"\n";

            declaraciones +=nombreNodoP +"-> nodoauxdeclarar"+actual+";\n";
            declaraciones +="nodoauxdeclarar"+actual+"-> nodotipo"+nombreNodoP+actual+";\n";
            declaraciones +="nodotipo"+nombreNodoP+actual+"->nodotipos"+nombreNodoP+actual+";\n";
            declaraciones +="nodotipos"+nombreNodoP+actual+" -> nodosis"+nombreNodoP+actual+";\n";
            declaraciones +="nodosis"+nombreNodoP+actual+"-> nodosids"+nombreNodoP+actual+";\n";
            declaraciones +="nodoauxdeclarar"+actual+" ->"+ val.nombrenodo+";\n";
        }

        const codigorama =` 
        ${nombreNodoP}[label ="DECLARARLISTACHAR"];
        ${ids}
        ${declaraciones}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}