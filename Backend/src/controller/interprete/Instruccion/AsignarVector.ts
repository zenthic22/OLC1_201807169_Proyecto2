import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';

export class AsignarVector extends Instruccion {
    private id: string;
    private value: Expresion;
    private posicion: Expresion;

    constructor(
        id: string,
        posicion: Expresion,
        value: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.posicion = posicion;
    }

    public execute(ambito: Ambito) {
        let variableOriginal = ambito.getVal(this.id)
        let nuevoValor = this.value?.execute(ambito)
        let pos = this.posicion.execute(ambito);
        if (variableOriginal != null){
            // validar la posicon es menor  al tamaño
            if(pos.value< variableOriginal.tamanio){
                // validar los tipos
                if(nuevoValor.type == variableOriginal.type){
                    variableOriginal.valor[pos.value] = this.value;
                }else {
                    let er = console.log("error")
                    throw er;
                }
            }
            else {
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