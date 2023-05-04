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
        let ramaState = `${nombreNodoP}[label="Instrucciones"];\n`;
        for(let i=0; i<this.code.length; i++) {
            const codigoState:{ codigorama:string, nombrenodo:string } = this.code[i].getAST();
            ramaState += codigoState.codigorama+"\n";
            ramaState += `${nombreNodoP} -> ${codigoState.nombrenodo};\n`;
        }
    
        return {codigorama:ramaState , nombrenodo:nombreNodoP.toString()};
    }
}