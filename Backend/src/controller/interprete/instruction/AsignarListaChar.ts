import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Primitivo } from '../expression/Primitivo';
import { TipoPrimitivo } from '../utils/TipoPrimitivo';
import { Type } from '../abstract/Return';

export class AsignarListaChar extends Instruction {
    private id: string;
    private value: Expression;

    constructor(
        id: string,
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(env: Environment) {
        const variableOriginal = env.getVar(this.id);
        const nuevoValor = this.value?.execute(env);
        if(variableOriginal != null) {
            if(variableOriginal.type == 3 && nuevoValor.type == 4 && variableOriginal.edd == 7) {
                const varaux = nuevoValor.value.split('');
                for(let i=0; i<varaux.length; i++) {
                    var aux = new Primitivo(varaux[i], TipoPrimitivo.CHAR, this.line, this.column);
                    variableOriginal.valor.push(aux);
                }
            } else {
                throw "error en asignacion lista char";
            }
        } else {
            throw "no se encuentra la lista char";
        }
    }
}