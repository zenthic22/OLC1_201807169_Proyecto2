import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

export class AsignarLista extends Instruction {
    private id: string;
    private value: Expression;

    constructor(
        id:string,
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(env: Environment) {
        let variableOriginal = env.getVar(this.id);
        let nuevoValor = this.value?.execute(env);
        if(variableOriginal != null) {
            if(nuevoValor.type == variableOriginal.type) {
                variableOriginal.valor.push(this.value);
            } else {
                throw "error en asignacion listas";
            }
        } else {
            throw "no se encuentra la variable lista";
        }
    }
}