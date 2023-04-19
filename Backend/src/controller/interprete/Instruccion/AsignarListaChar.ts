import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';
import { Primitivo, TipoPrimitivo } from '../Expresion/Primitivo';
import { Type } from '../Expresion/Retorno';

export class AsignarListaChar extends Instruccion {
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
        const variableOriginal = ambito.getVal(this.id)
        const nuevoValor = this.value?.execute(ambito)
        if (variableOriginal != null){
            // validar los tipos
            if( variableOriginal.type == 4 && nuevoValor.type == 1 && variableOriginal.edd == 6){
                const varaux = nuevoValor.value.split('');
                for(let i=0;i<varaux.length;i++){
                    var aux = new Primitivo( varaux[i],TipoPrimitivo.CARACTER,this.line, this.column);
                    variableOriginal.valor.push( aux);
                }  
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