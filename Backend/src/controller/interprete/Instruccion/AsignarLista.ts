import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';

export class AsignarLista extends Instruccion {
    private id: string;
    private value: Expresion;

    constructor(
        id: string,
        value: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(ambito: Ambito) {
        let variableOriginal = ambito.getVal(this.id)
        let nuevoValor = this.value?.execute(ambito)
        if (variableOriginal != null){
            // validar los tipos
            if(nuevoValor.type == variableOriginal.type){
                variableOriginal.valor.push( this.value);
            }else {
                let er = console.log("error")
                throw er;
            }
        }else {
            let er = console.log("error")
            throw er;
        }
    }
}

export enum tiposvalidos {
    DOUBLE,
    ENTERO
}