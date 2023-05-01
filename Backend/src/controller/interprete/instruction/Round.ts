import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';

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
}