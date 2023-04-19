import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';

export class DeclararVector extends Instruccion {
    private id: string[];
    private value: Expresion[]|null;
    private tipo1: number;
    private tamaño?: Expresion; //para vectores
    private tipo2?: number;

    constructor(
        tipo1: number,
        id: string[],
        value: Expresion[],
        line: number,
        column: number,
        tamaño?: Expresion,
        tipo2?: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipo1 = tipo1;
        this.tamaño = tamaño;
        this.tipo2 = tipo2;
    }

    public execute(ambito: Ambito) {
        for(const actual of this.id) {
            if(this.value == null){
                if(this.tipo1 == this.tipo2){
                    let ta = this.tamaño?.execute(ambito);
                    ambito.setVal(actual,[],this.tipo1, this.line, this.column,ta?.value,Type.VECTOR);
                }
                else {
                    let er = console.log("error")
                    throw er;
                }
            } else{
                let tam = this.value.length;
                ambito.setVal(actual,this.value,this.tipo1, this.line, this.column,tam,Type.VECTOR);
            }
        }
    }
}