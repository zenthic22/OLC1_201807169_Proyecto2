import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';
import { Union } from '../utils/Union';

let contador:number = 0;

export class DoWhile extends Instruction {
    constructor(
        private condicion: Expression,
        private cuerpo: Instruction,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        let value = this.condicion.execute(env);
        if(value.type != Type.BOOLEAN) {
            let err = console.log("la condicion a evaluar no de tipo boolean");
        }

        let limit = 0;
        while(true) {
            const retorno = this.cuerpo.execute(env);
            if(retorno != null && retorno != undefined) {
                if(retorno.type == 'Break') {
                    break;
                } else if(retorno.type == 'Continue') {
                    continue;
                }
            }
            value = this.condicion.execute(env);
            limit++;
            if(limit == 10000 || !value.value) {
                break;
            }
        }
        if(limit == 10000) {
            let err = console.log("limite de iteraciones While");
            throw err;
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nododowhile"+aleatorio.toString();
        const instru: { codigorama:string, nombrenodo:string } = this.cuerpo.getAST();
        const cond: { codigorama:string, nombrenodo:string } = this.condicion.getAST();

        const codigorama = `
        ${nombreNodoP}[label="DO WHILE"];
        nodocondicion${nombreNodoP}[label="CONDICION"];
        nodoinstruccion${nombreNodoP}[label="INSTRUCCION"];
        ${cond.codigorama}
        ${instru.codigorama}
        ${nombreNodoP} -> nodocondicion${nombreNodoP};
        nodocondicion${nombreNodoP} -> ${cond.nombrenodo};
        ${nombreNodoP} -> nodoinstruccion${nombreNodoP};
        nodoinstruccion${nombreNodoP} -> ${instru.nombrenodo};
        `

        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}