import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";
import { Instruction } from '../abstract/Instruction';
import { Union } from '../utils/Union';

let contador:number = 0;

export class Funcion extends Instruction {
    constructor(
        public id: string,
        public statement: Instruction,
        public parametros: [],
        public subrutina: number,
        line: number,
        column: number,
        public tipo?: Type
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        if(this.tipo == null || this.tipo == undefined) {
            env.guardarFuncion(this.id, this, this.line, this.column, this.subrutina, Type.NULL);
        } else {
            env.guardarFuncion(this.id, this, this.line,this.column,this.subrutina,this.tipo);
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodofuncion"+aleatorio.toString();

        let ids = "";
        let declaracion = "";

        var param = { codigorama:"nodo", nombrenodo:"nodo[label=\"sinparametros\"]" }

        if(this.statement) {
            param = this.statement.getAST();
        }

        for(const actual of this.parametros) {
            ids += "nodoauxfuncion"+actual+"[label=\"PARAMETROS FUNCION\"];\n";
        }

        const codigorama = `
        ${nombreNodoP}[label="FUNCION"];
        `

        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}