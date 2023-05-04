import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Union } from '../utils/Union';

let contador:number = 0;

export class Declarar extends Instruction {
    private id: string[];
    private valor: Expression | null;
    private tipo: number;

    constructor(
        tipo: number,
        id: string[],
        valor: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
    }

    public execute(env: Environment): any {
        for(const actual of this.id) {
            let val = this.valor?.execute(env);
            if(this.valor == null) {
                env.guardar(actual, val?.value, this.tipo, this.line, this.column, null);
            } else if(this.tipo == 0 && val?.type == 1) {
                env.guardar(actual, val.value, val.type, this.line, this.column, null);
            } else if(this.tipo == 1 && val?.type == 0) {
                env.guardar(actual, val.value, val.type, this.line, this.column, null);
            } else if(this.tipo == val?.type) {
                env.guardar(actual, val.value, val.type, this.line, this.column, null);
            }
             else {
                env.guardar(actual, null, this.tipo, this.line, this.column, null);
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        let tipo = "BOOLEANO";
        if (this.tipo == 4){
            tipo ="CADENA";
        }else if (this.tipo == 0) {
            tipo ="ENTERO";
        } else if (this.tipo == 1) {
            tipo ="DOULBE";
        } else if (this.tipo == 3) {
            tipo ="CARACTER";
        }
        let ids ="";
        let declaraciones="";
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nododeclarar"+aleatorio.toString();
       var val = {codigorama:"nodo",nombrenodo:"nodo[label =\"sinvalor\"]"}
        if(this.valor){
            val  =this.valor.getAST();
        }
        for (const actual of this.id) {
            ids += "nodoauxdeclarar"+actual+"[label =\"DECLARAR\"];\n";
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
        ${nombreNodoP}[label ="DECLARAR"];
        ${ids}
        ${declaraciones}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}