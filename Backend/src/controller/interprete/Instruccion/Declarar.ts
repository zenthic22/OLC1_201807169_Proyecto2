import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';

export class Declarar extends Instruccion {
    private id: string[];
    private value: Expresion|null;
    private tipo: number;
    private tamaño?: number //para vectores

    constructor(
        tipo: number,
        id: string[],
        value: Expresion,
        line: number,
        column: number,
        tamaño?: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipo = tipo;
        this.tamaño = tamaño;
    }

    public execute(ambito: Ambito) {
        for (const actual of this.id) {
            // para asignar variables  normales
            let val = this.value?.execute(ambito)
            if(this.value == null){
                ambito.createVar(actual, val?.value,this.tipo, this.line, this.column,null)
            }else if(this.tipo == 0 && val?.type == 3){
                ambito.createVar(actual, val?.value,val?.type, this.line, this.column,null);
            }else if(this.tipo == 3 && val?.type == 0){
                ambito.createVar(actual, val?.value,val?.type, this.line, this.column,null);
            }
            else if(this.tipo == val?.type){
                ambito.createVar(actual, val?.value,val?.type, this.line, this.column,null);
            }else{
                let er = console.log("error")
                throw er;
            }
        }
    }
}