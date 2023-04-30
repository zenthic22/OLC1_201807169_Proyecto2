import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

export class AsignarVector extends Instruction {
    private id: string;
    private value: Expression;
    private posicion: Expression;

    constructor(
        id: string,
        posicion: Expression,
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.posicion = posicion;
    }

    public execute(env: Environment) {
        let variableOriginal = env.getVar(this.id);
        let nuevoValor = this.value?.execute(env);
        let pos = this.posicion.execute(env);
        if(variableOriginal != null) {
            if(pos.value < variableOriginal.tamanio) {
                if(nuevoValor.type == variableOriginal.type) {
                    variableOriginal.valor[pos.value] = this.value;
                } else {
                    throw "error de asignacion: "+this.id+" tipo: "+variableOriginal.type
                }
            } else {
                throw "mehx2";
            }
        } else {
            throw "no hay variable";
        }
    }
}