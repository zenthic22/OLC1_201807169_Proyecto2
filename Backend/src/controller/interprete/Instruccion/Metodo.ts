import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';
import { Instruccion } from './Instruccion';

export class Metodo extends Instruccion {
    constructor(
        public id: string,
        public statement: Instruccion,
        public parametros: [],
        public subrutina: string,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        
    }
}