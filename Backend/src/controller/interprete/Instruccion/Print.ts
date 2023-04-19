import { Instruccion } from '../Instruccion/Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Mas/Ambito';
import { ListaPrint } from '../Instruccion/ListaPrint';

export class Print extends Instruccion {
    private value: Expresion[];
    
    constructor(
        value: Expresion[],
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(ambito: Ambito): any {
        for (const actual of this.value) {
            const val = actual.execute(ambito)
            console.log(val.value)
            ListaPrint.push(val.value);
        }
    }
}