import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { LlamadaFuncion } from '../instruction/LlamadaFuncion';

let contador:number = 0;

export class Main extends Instruction {
    constructor(
        private funcioninicial: LlamadaFuncion,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        this.funcioninicial.execute(env);
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodomain"+aleatorio.toString();

        const llamar: { codigorama:string, nombrenodo:string } = this.funcioninicial.getAST();

        const codigorama = `
        ${nombreNodoP}[label="MAIN"];
        nodollamada${nombreNodoP}[label="LLAMADA"];
        ${llamar.codigorama}
        ${nombreNodoP} -> nodollamada${nombreNodoP};
        nodollamada${nombreNodoP} -> ${llamar.nombrenodo};
        `
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}