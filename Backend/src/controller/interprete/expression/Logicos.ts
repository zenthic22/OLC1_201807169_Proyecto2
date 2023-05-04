import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { TipoLogico } from '../utils/TipoLogico';
import { Environment } from '../abstract/Environment';

export class Logicos extends Expression {
    constructor(
        private izquierdo: Expression,
        private derecho: Expression,
        private tipoLogico: TipoLogico,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        const izquierdo = this.izquierdo.execute(env);
        const derecho = this.derecho.execute(env);
        if(this.tipoLogico == TipoLogico.NOT) {
            const result = !izquierdo.value;
            return { value: result, type: Type.BOOLEAN }
        } else if(this.tipoLogico == TipoLogico.AND) {
            const result = izquierdo.value && derecho.value;
            return { value: result, type: Type.BOOLEAN }
        } else if(this.tipoLogico == TipoLogico.OR) {
            const result = izquierdo.value || derecho.value;
            return { value: result, type: Type.BOOLEAN }
        } else {
            return { value: null, type: Type.NULL }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        let op="&&";
        if(this.tipoLogico == TipoLogico.NOT){
            op="!";
        }else if(this.tipoLogico == TipoLogico.OR){
             op="||";
        }
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodologico"+aleatorio.toString();
        const exiz:{codigorama:string ,nombrenodo:string} =this.izquierdo.getAST();
        const exder:{codigorama:string ,nombrenodo:string} =this.derecho.getAST();
        const codigorama =` 
        ${nombreNodoP}[label ="LOGICO"];
        nodooperacion${nombreNodoP}[label="${op}"];
        ${exiz.codigorama}
        ${exder.codigorama}
        ${nombreNodoP} ->${exiz.nombrenodo};
        ${nombreNodoP} -> nodooperacion${nombreNodoP};
        ${nombreNodoP} ->${exder.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}