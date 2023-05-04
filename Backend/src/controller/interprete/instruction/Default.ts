import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';
import { Union } from '../utils/Union';

let contador:number = 0;

export class Default extends Instruction {
    constructor(
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        return { type: 'Default', line: this.line, column: this.column }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nododefault"+aleatorio.toString();
        const codigorama = `
        ${nombreNodoP}[label="DEFAULT"];
        `
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}