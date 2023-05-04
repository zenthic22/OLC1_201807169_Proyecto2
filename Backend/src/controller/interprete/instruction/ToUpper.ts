import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';

let contador:number = 0;

export class ToUpper extends Instruction {
    private value: Expression;

    constructor(
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(env: Environment): any {
        let tostr = this.value.execute(env);
        let stringretornar = tostr.value.toString();
        if(stringretornar) {
            stringretornar = stringretornar.toUpperCase();
            return { value: stringretornar, type: tostr.type }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodotoupper"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="TO UPPER"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}