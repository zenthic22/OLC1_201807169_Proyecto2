import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';
import { Union } from '../utils/Union';

let contador:number = 0;

export class Continue extends Instruction {
    constructor(
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        return { type: 'Continue', line: this.line, column: this.column }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodocontinue"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="CONTINUE"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}