import { Environment } from '../abstract/Environment';
import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { TipoPrimitivo } from '../utils/TipoPrimitivo';

export class Primitivo extends Expression {
    constructor(
      line: number,
      column: number,
      private value: any,
      private tipo: TipoPrimitivo
    ) {
      super(line, column);
    }

    public execute(): Return {
        if(this.tipo == 0) {
            return { value: Number(this.value), type: Type.INT }
        } else if(this.tipo == 1) {
            return { value: parseFloat(this.value), type: Type.DOUBLE }
        } else if(this.tipo == 2) {
            if(this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Type.BOOLEAN }
            }
            return { value: false, type: Type.BOOLEAN }
        } else if(this.tipo == 3) {
            return { value: this.value, type: Type.CHAR }
        } else {
            return { value: this.value.toString(), type: Type.STRING }
        }
    }
}