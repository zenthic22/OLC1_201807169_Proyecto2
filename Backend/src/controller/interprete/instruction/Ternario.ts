import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Union } from '../utils/Union';

let contador:number = 0;

export class Ternario extends Instruction {
    private condicion: Expression;
    private retorno1: Expression;
    private retorno2: Expression;

    constructor(
        condicion: Expression,
        retorno1: Expression,
        retorno2: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.condicion = condicion;
        this.retorno1 = retorno1;
        this.retorno2 = retorno2;
    }

    public execute(env: Environment) {
        let resCondicion = this.condicion.execute(env);
        let ret1 = this.retorno1.execute(env);
        let ret2 = this.retorno2.execute(env);
        try {
            if(resCondicion.value) {
                return { value: ret1.value, type: ret1.type }
            } else {
                return { value: ret2.value, type: ret2.type }
            }
        }catch(error) {
            throw "operacion ternaria no valida";
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoround"+aleatorio.toString();
        const ret1: { codigorama:string, nombrenodo:string } = this.retorno1.getAST();
        const ret2: { codigorama:string, nombrenodo:string } = this.retorno2.getAST();
        const codigorama =` 
        ${nombreNodoP}[label ="TERNARIO"];
        retorno1${nombreNodoP}[label="RETORNO 1"];
        retorno2${nombreNodoP}[label="RETORNO 2"];
        ${ret1.codigorama}
        ${ret2.codigorama}
        ${nombreNodoP} -> retorno1${ret1.nombrenodo} -> retorno2${ret2.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}