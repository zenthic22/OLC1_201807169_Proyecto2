import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Union } from '../utils/Union';

let contador:number = 0;

export class ModificarLista extends Instruction {
    private id: string;
    private value: Expression;
    private indice: Expression;

    constructor(
        id: string,
        indice: Expression,
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.indice = indice;
    }

    public execute(env: Environment) {
        let variableOriginal = env.getVar(this.id);
        let nuevoValor = this.value?.execute(env);
        if(variableOriginal != null) {
            let ind = this.indice.execute(env);
            if(ind.value < variableOriginal.valor.length) {
                if(nuevoValor.type == variableOriginal.type) {
                    variableOriginal.valor[ind.value] = this.value;
                } else {
                    throw "error de asignacion: mod";
                }
            } else{
                if(nuevoValor.type == variableOriginal.type) {
                    variableOriginal.valor.splice(ind.value,0,this.value);
                } else  {
                    throw "tipos no coinciden";
                }
            }
        } else {
            throw "no se encuetra la variable lista mod";
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodomodificar"+aleatorio.toString();

        const ind: { codigorama:string, nombrenodo:string } = this.indice.getAST();
        const val: { codigorama:string, nombrenodo:string } = this.value.getAST();

        const codigorama = `
        ${nombreNodoP}[label="MODIFICAR"];
        nodoIndice${nombreNodoP}[label="INDICE"];
        ${val.codigorama}
        ${ind.codigorama}
        ${nombreNodoP} -> nodoIndice${nombreNodoP} -> ${ind.nombrenodo};
        ${nombreNodoP} -> ${val.nombrenodo};
        `
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}