import { Expresion } from '../Expresion/Expresion';
import { Type } from '../Expresion/Retorno';
import { Ambito } from '../Mas/Ambito';
import { Instruccion } from './Instruccion';

export class If extends Instruccion {
    constructor(
        private condicion: Expresion,
        private cuerpo: Instruccion,
        private contrario: Instruccion,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        const value = this.condicion.execute(ambito)

        if (value.type != Type.BOOLEANO) 
        {      // true - false
            let er = console.log("error")
            throw er;
        }
        if (value.value) {
            return this.cuerpo.execute(ambito)

        } else if (this.contrario != null) {
            return this.contrario.execute(ambito)
        }
    }
}