import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';

let contador:number = 0;

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

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoasignacionlista"+aleatorio.toString();
        const val:{codigorama:string ,nombrenodo:string} =this.value.getAST();
        const codigorama =` 
        ${nombreNodoP}[label ="ASIGNARLISTA"];
        nodoIDS${nombreNodoP}[label="IDLISTA"];
        nodoid${nombreNodoP}[label="${this.id}"];
        ${val.codigorama}
        ${nombreNodoP} ->nodoIDS${nombreNodoP} ->nodoid${nombreNodoP};
        ${nombreNodoP}->${val.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}