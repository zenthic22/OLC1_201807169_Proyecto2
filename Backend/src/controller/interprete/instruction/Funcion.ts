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
        const id = Math.floor(Math.random()*(1000-0)+0);
        const nodoPrincipal = `nodoInstFun${id.toString()}`;
        const nodoId = `nodoIdFun${id.toString()}`;
        const nodoParam = `nodoPFun${id.toString()}`;
        const nodoTipo = `nodoTFun${id.toString()}`;

        const codigoInst: { codigorama: string, nombrenodo: string } = this.statement.getAST();

        let ramaParam = `${nodoPrincipal}[label = "Declarar"];\n`;
        ramaParam += `${nodoTipo}[label = "Tipo"];\n`;
        ramaParam += `${nodoId}[label = "${this.id}"];\n`;
        ramaParam += `${nodoParam}[label = "Parametros"];\n`;
        ramaParam += `${nodoPrincipal} -> ${nodoTipo};\n`;
        ramaParam += `${nodoPrincipal} -> ${nodoId};\n`;
        ramaParam += `${nodoId} -> ${nodoParam};\n`;
        
        for(let i = 0; i<this.parametros.length; i++){
            const codigoParam: { rama: string, nodo: string } = this.parametros[i];
            ramaParam += codigoParam.rama + "\n";
            ramaParam += `${nodoParam} -> ${codigoParam.nodo};\n`;
        }

        ramaParam += codigoInst.codigorama + "\n";
        ramaParam += `${nodoId} -> ${codigoInst.nombrenodo};\n`;
        return {codigorama: ramaParam, nombrenodo: nodoPrincipal.toString()}
    }
}