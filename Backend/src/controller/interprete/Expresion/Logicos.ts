import { Expresion } from './Expresion';
import { Retorno, Type } from './Retorno';
import { Ambito } from '../Mas/Ambito';

export class Logicos extends Expresion {
    constructor(
        private left: Expresion,
        private right: Expresion,
        private tipo: TipoLogico,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue =this.right.execute(ambito);
        if (this.tipo == TipoLogico.NOT) {
            return { value: !(leftValue.value), type: Type.BOOLEANO }
        } else if (this.tipo == TipoLogico.AND) {
            return { value: (leftValue.value && rightValue.value), type: Type.BOOLEANO }
        } else if (this.tipo == TipoLogico.OR) {
            return { value: (leftValue.value || rightValue.value), type: Type.BOOLEANO }
        }else {
            let er = console.log("error")
            throw er;
        }
    }
}

export enum TipoLogico {
    AND,
    OR,
    NOT
}