import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";
import { Union } from "../utils/Union";

let contador:number = 0;

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
        let nombreNodoP = "nododeclararvector"+aleatorio.toString();
        var val = {codigorama:"nodo",nombrenodo:"nodo[label =\"sinvalor\"]"}
        for (const actual of this.id) {
            ids += "nodoauxdeclarar"+actual+"[label =\"DECLARARVECTOR\"];\n";
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
        ${nombreNodoP}[label ="DECLARARVECTOR"];
        ${ids}
        ${declaraciones}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}