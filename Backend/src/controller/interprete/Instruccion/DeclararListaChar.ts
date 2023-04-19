import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';
import { Type } from '../Expresion/Retorno';
import { Primitivo, TipoPrimitivo } from '../Expresion/Primitivo';

export class DeclararListaChar extends Instruccion {
    private id: string[];
    private value: Expresion;
    private tipo1: number;

    constructor(
        tipo1: number,
        id: string[],
        value: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.tipo1 = tipo1;
        this.value = value;
    }

    public execute(ambito: Ambito) {
        for(const actual of this.id) {
            if(this.tipo1 == 4){
                const listacaracter = this.value.execute(ambito);
                if(listacaracter.type == 1){
                    ambito.setVal(actual,[],this.tipo1, this.line, this.column,null,Type.LISTA);
                    const variableOriginal = ambito.getVal(actual);
                    const varaux = listacaracter.value.split('');
                    for(let i=0;i<varaux.length;i++){
                        var aux = new Primitivo( varaux[i],TipoPrimitivo.CARACTER,this.line, this.column);
                        variableOriginal?.valor.push(aux)
                    }
                }
                else {
                    let er = console.log("error")
                    throw er;
                }
            } else{
                let er = console.log("error")
                throw er;
            }
        }
    }
}