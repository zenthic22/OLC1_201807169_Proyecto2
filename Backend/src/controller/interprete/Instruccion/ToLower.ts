import { Instruccion } from './Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';

export class ToLower extends Instruccion {
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
        let tostr = this.value.execute(ambito);
        let stringretornar = tostr.value.toString();
        if(stringretornar){
            stringretornar = stringretornar.toLowerCase();
            return { value: stringretornar,type:tostr.type}
        }else {
            let er = console.log("error")
            throw er;
     
        }
    }
}