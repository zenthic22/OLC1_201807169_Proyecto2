import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';

let contador:number = 0;

export class Round extends Instruction {
    private value: Expression;

    constructor(value: Expression, line: number, column: number) {
        super(line, column)
        this.value = value
    }
    public execute(env: Environment): any {
        let round = this.value.execute(env);
        try {
            if(round!= null && round != undefined){
                if(round.type == 0 ||round.type == 3 ){
                     return { value: Math.round(round.value),type:Type.DOUBLE}
                }
                else{
                    throw "error en redondeo";
                }
           
            }
        } catch (error) {
            throw "error en funcion round";
        }   
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoround"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="ROUND"];
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}