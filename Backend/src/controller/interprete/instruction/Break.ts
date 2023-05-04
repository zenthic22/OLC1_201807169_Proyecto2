import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class Break extends Instruction {
    constructor(
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        return { type: 'Break', line: this.line, column: this.column }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodobreak"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="BREAK"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}