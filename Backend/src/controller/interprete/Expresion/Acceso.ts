//clase para acceder a las variables
import { Expresion } from './Expresion';
import { Retorno, Type } from './Retorno';
import { Ambito } from '../Mas/Ambito';

export class Acceso extends Expresion {
    public valor: string;

    constructor(
        public id: string,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let value = ambito.getVal(this.id);
        if(value != null) {
            this.valor = value.valor.toString();
            return { value: value.valor, type: value.type, tamanio: value.tamanio, edd: value.edd }
        }
        let er = console.log("error");
        throw er;
    }
}