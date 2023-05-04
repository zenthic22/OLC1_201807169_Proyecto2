import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

let contador:number = 0;

export class Return extends Instruction {
    constructor(
        line: number,
        column: number,
        public retorno?: Expression
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        if(this.retorno != null || this.retorno != undefined) {
            const r = this.retorno?.execute(env)
            return { value: r?.value, type: 'Return', tipo: r?.type, line: this.line, column: this.column }
        }
        return { value: undefined, type: 'Return', line: this.line, column: this.column }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoreturn"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="RETURN"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}