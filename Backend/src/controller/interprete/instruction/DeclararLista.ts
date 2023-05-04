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
        let nombreNodoP = "nododeclararlista"+aleatorio.toString();
        var val = {codigorama:"nodo",nombrenodo:"nodo[label =\"sinvalor\"]"}
        for (const actual of this.id) {
            ids += "nodoauxdeclarar"+actual+"[label =\"DECLARARLISTA\"];\n";
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
        ${nombreNodoP}[label ="DECLARARLISTA"];
        ${ids}
        ${declaraciones}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}