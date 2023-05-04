import { Instruction } from "../abstract/Instruction";
import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Error } from "../Error/Error";
import { ListaError } from "../Reports/ListaError";
import { Type } from "../abstract/Return";
import { Union } from "../utils/Union";

let contador:number = 0;

export class Asignar extends Instruction {
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
        let variableOriginal = env.getVar(this.id);
        console.log(variableOriginal);
        let nuevoValor = this.value.execute(env);
        if(variableOriginal != null) {
            if(variableOriginal.type == 0 && nuevoValor.type == 1) {
                variableOriginal.type = 1;
                variableOriginal.valor = nuevoValor.value;
            } else if(variableOriginal.type == 1 && nuevoValor.type == 0) {
                variableOriginal.type = 0;
                variableOriginal.valor = nuevoValor.value;
            } else if(variableOriginal.type == nuevoValor.type) {
                variableOriginal.valor = nuevoValor.value;
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoasignacion"+aleatorio.toString();
        const val:{codigorama:string ,nombrenodo:string} =this.value.getAST();
        const codigorama =` 
        ${nombreNodoP}[label ="ASIGNAR"];
        nodoIDS${nombreNodoP}[label="ID"];
        nodoid${nombreNodoP}[label="${this.id}"];
        ${val.codigorama}
        ${nombreNodoP} ->nodoIDS${nombreNodoP} ->nodoid${nombreNodoP};
        ${nombreNodoP}->${val.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}
