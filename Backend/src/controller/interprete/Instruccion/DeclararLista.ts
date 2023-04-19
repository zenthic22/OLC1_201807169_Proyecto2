import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';

export class DeclararLista extends Instruccion {
    private id: string[];
    private value: Expresion[];
    private tipo1: number;
    private tipo2: number;

    constructor(
        tipo1: number,
        id: string[],
        tipo2: number,
        value: Expresion[],
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.value = value;
    }

    public execute(ambito: Ambito) {
        for(const actual of this.id) {
            if(this.value == null){
                if(this.tipo1 == this.tipo2){
                    ambito.setVal(actual,this.value,this.tipo1, this.line, this.column,null,Type.LISTA);
                }
                else {
                    let er = console.log("error")
                    throw er;
                }
            } else{
                ambito.setVal(actual,this.value,this.tipo1, this.line, this.column,null,Type.LISTA);
            }
        }
    }
}