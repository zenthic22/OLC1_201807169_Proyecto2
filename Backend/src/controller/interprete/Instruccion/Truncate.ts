import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';

export class Truncate extends Instruccion {
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
        let trun = this.value.execute(ambito);
        try {
            if(trun!= null && trun != undefined){
                if(trun.type == 0 ||trun.type == 3 ){
                     return { value: Math.trunc(trun.value),type:Type.ENTERO}
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