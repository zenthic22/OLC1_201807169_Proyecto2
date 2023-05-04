import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { TipoRelacional } from '../utils/TipoRelacional';
import { Environment } from '../abstract/Environment';

export class Relacional extends Expression {
    constructor(
        private izquierdo: Expression,
        private derecho: Expression,
        private tipo: TipoRelacional,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        const op1 = this.izquierdo.execute(env);
        const op2 = this.derecho.execute(env);

        if(this.tipo == TipoRelacional.IGUALACION) {
            return { value: op1.value == op2.value, type: Type.BOOLEAN }
        } else if(this.tipo == TipoRelacional.DIFERENCIACION) {
            return { value: op1.value != op2.value, type: Type.BOOLEAN }
        } else if(this.tipo == TipoRelacional.MAYOR) {
            return { value: op1.value > op2.value, type: Type.BOOLEAN }
        } else if(this.tipo == TipoRelacional.MAYORIGUAL) {
            return { value: op1.value >= op2.value, type: Type.BOOLEAN }
        } else if(this.tipo == TipoRelacional.MENOR) {
            return { value: op1.value < op2.value, type: Type.BOOLEAN }
        } else if(this.tipo == TipoRelacional.MENORIGUAL) {
            return { value: op1.value <= op2.value, type: Type.BOOLEAN }
        } else {
            let err = console.log("error en operacion relacional");
            throw err;
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoaritmetica"+aleatorio.toString();
        const exiz:{codigorama:string ,nombrenodo:string} =this.izquierdo.getAST();
        const exder:{codigorama:string ,nombrenodo:string} =this.derecho.getAST();
        const codigorama =` 
        ${nombreNodoP}[label ="RELACIONAL"];
        nodooperacion${nombreNodoP}[label="${this.tipo.toString()}"];
        ${exiz.codigorama}
        ${exder.codigorama}
        ${nombreNodoP} ->${exiz.nombrenodo};
        ${nombreNodoP} -> nodooperacion${nombreNodoP};
        ${nombreNodoP} ->${exder.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}