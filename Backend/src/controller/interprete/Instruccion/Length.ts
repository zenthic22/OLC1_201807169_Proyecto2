import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';

export class Length extends Instruccion {
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
        let len = this.value.execute(ambito);
        try {
            let lenret = len.value.length;
            if(len.tamanio != null || len.tamanio != undefined){
                return { value: len.tamanio,type:Type.ENTERO}
           
            }
            else if(lenret != undefined){
                return { value: lenret,type:Type.ENTERO}
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