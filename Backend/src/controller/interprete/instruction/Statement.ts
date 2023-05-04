import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';
import { Union } from '../utils/Union';
import { Funcion } from './Funcion';

let contador:number = 0;

export class Statement extends Instruction {
    constructor(
        private code: Instruction[],
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        const nuevoAmbito = new Environment(env);
        for(const inst of this.code) {
            try {
                const ret = inst.execute(nuevoAmbito);
                if(ret != null && ret != undefined) {
                    return ret;
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodostatement"+aleatorio.toString();

        let bloque = "";

        for(const actual of this.code) {
            bloque += "nodoauxstatement"+actual+"[label=\"BLOQUE\"];\n";

        }

        const codigorama = `
            ${nombreNodoP}[label="STATEMENT"];
            `
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}