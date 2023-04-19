import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { Instruccion } from './Instruccion';

export class Caso {
    public linea: number;
    public columna: number;
    public instrucciones: Instruccion[];
    public expresion: Expresion;

    constructor(caso: Expresion, code: Instruccion[], line: number, column: number) {
        this.linea = line;
        this.columna = column;
        this.instrucciones = code;
        this.expresion = caso;
    }

    public getInstruccion(): Instruccion[] {
        return this.instrucciones;
    }

    public getExpresion(): Expresion {
        return this.expresion;
    }
}