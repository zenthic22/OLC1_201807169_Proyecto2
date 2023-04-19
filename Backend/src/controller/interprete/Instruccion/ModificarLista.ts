import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';

export class ModificarLista extends Instruccion {
    private id: string;
    private value: Expresion;
    private indice: Expresion;

    constructor(
        id: string,
        indice: Expresion,
        value: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.indice = indice;
    }

    public execute(ambito: Ambito) {
        let variableOriginal = ambito.getVal(this.id)
        let nuevoValor = this.value?.execute(ambito)
        if (variableOriginal != null){
            // validar la posicon es menor  al tamaño
            let ind = this.indice.execute(ambito);
            if(ind.value < variableOriginal.valor.length){
                // validar los tipos
                if(nuevoValor.type == variableOriginal.type){
                    variableOriginal.valor[ind.value] = this.value;
                }else {
                    let er = console.log("error")
                    throw er;
                }
            }
            else {
                if(nuevoValor.type == variableOriginal.type){
                    variableOriginal.valor.splice(ind.value ,0,this.value);
                }else {
                    let er = console.log("error")
                    throw er;
                }
            } 
        }else {
            let er = console.log("error")
            throw er;
        }
    }
}