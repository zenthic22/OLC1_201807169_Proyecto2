import { Instruction } from "../abstract/Instruction";
import { Expression } from "../abstract/Expression";
import { printlist } from "../Reports/PrintList";
import { Environment } from "../abstract/Environment";
import { Union } from '../utils/Union';

let contador:number = 0;

export class Print extends Instruction {
    private value: Expression[];

    constructor(
        value: Expression[],
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(env: Environment): any {
        for(const actual of this.value) {
            const val = actual.execute(env);
            printlist.push(val.value);
            console.log("desde consola: ", val.value);
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "print"+aleatorio.toString();
        let valores = "";
        let valores2 = "";
        for (const actual of this.value) {
            const exiz:{codigorama:string ,nombrenodo:string} = actual.getAST();
            valores +=exiz.codigorama+"\n";
            valores2+=nombreNodoP+ "->"+exiz.nombrenodo+";\n"
        }
       
        const codigorama =` 
        ${nombreNodoP}[label ="PRINT"];
        ${valores}
        ${valores2}
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}