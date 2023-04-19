import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';

export class Round extends Instruccion {
    private value: Expresion;

    constructor(
        value: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(ambito: Ambito): any {
        let round = this.value.execute(ambito);
        try {
            if(round!= null && round != undefined){
                if(round.type == 0 ||round.type == 3 ){
                     return { value: Math.round(round.value),type:Type.DOUBLE}
                }
                else{
                    let er = console.log("error")
                    throw er;
                }
            }
            else {
            }
        } catch (error) {
            let er = console.log("error")
            throw er;
        }
    }
}