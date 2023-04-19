import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';
import { Instruccion } from './Instruccion';

export class Funcion extends Instruccion {
    constructor(
        public id: string,
        public statement: Instruccion,
        public parametros: [],
        public subrutina: number,
        line: number,
        column: number,
        public tipo?: any
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
            if(this.tipo == null ||this.tipo == undefined){
                ambito.guardarFuncion(this.id, this,this.line ,this.column,this.subrutina,10);
            }else{
                ambito.guardarFuncion(this.id, this,this.line ,this.column,this.subrutina,this.tipo);
            }
    }
}