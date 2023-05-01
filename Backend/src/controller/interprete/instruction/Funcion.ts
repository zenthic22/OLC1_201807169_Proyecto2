import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";
import { Instruction } from '../abstract/Instruction';

export class Funcion extends Instruction {
    constructor(
        public id: string,
        public statement: Instruction,
        public parametros: [],
        public subrutina: number,
        line: number,
        column: number,
        public tipo?: Type
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        if(this.tipo == null || this.tipo == undefined) {
            env.guardarFuncion(this.id, this, this.line, this.column, this.subrutina, Type.NULL);
        } else {
            env.guardarFuncion(this.id, this, this.line,this.column,this.subrutina,this.tipo);
        }
    }
}