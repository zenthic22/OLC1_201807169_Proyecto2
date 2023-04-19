import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';
import { Instruccion } from './Instruccion';
import { LlamadaFuncion } from '../Instruccion/LlamadaFuncion';

export class Main extends Instruccion {
    constructor(
        public funcioninicial: LlamadaFuncion,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        this.funcioninicial.execute(ambito);
    }
}