import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

let contador:number = 0;

export class Truncate extends Instruction {
    private value: Expression;

    constructor(
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(env: Environment) {
        let trun = this.value.execute(env);
        try {
            if(trun != null && trun != undefined) {
                if(trun.type == 0 || trun.type == 1) {
                    return { value: Math.trunc(trun.value), type: Type.INT }
                } else {
                    throw "error de truncate";
                }
            }
        } catch(error) {
            throw "error en funcion truncate";
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodotruncate"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="TRUNCATE"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}