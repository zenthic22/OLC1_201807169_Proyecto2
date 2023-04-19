import { Ambito } from '../Mas/Ambito';
import { Instruccion } from './Instruccion';

export class Break extends Instruccion {
    constructor(
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        return { type: 'Break', line: this.line, column: this.column }
    }
}