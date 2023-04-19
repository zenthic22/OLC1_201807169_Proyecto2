import { Expresion } from './Expresion';
import { Retorno, Type } from './Retorno';
import { Ambito } from '../Mas/Ambito';

export class AccesoLista extends Expresion {
    constructor(
        public id: string,
        public posicion: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let value = ambito.getVal(this.id);
        if(value != null) {
            //comprobando que el tamaño sea menor
            let pos = this.posicion.execute(ambito);
            if(pos.value < value.valor.length) {
                if(value.valor != null) {
                    let v = value.valor[pos.value].execute(ambito);
                    let va = v.value;
                    return { value: va, type: value.type }
                } else {
                    return { value: null, type: value.type }
                }
            } else {
                let er = console.log("error");
                throw er;
            }
        } else {
            let er = console.log("err")
            throw er;
        }
    }
}