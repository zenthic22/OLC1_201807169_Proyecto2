import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';

export class Tostring extends Instruccion {
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
        let to_cadena = this.value.execute(ambito);   
        try {
            if(to_cadena.type  == 0 || to_cadena.type  == 2){
                return { value: to_cadena.value.toString(),type:Type.CADENA}
            }
            else {
                let er = console.log("error")
                throw er;
            }
        } catch (error) {
            let er = console.log("error")
            throw er;
        }
    }
}