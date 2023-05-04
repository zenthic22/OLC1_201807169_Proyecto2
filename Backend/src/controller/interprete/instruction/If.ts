import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class If extends Instruction {
    constructor(
        private condicion: Expression,
        private cuerpo: Instruction,
        private contrario: Instruction,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        const value = this.condicion.execute(env);
        if(value.type != Type.BOOLEAN) {
            let er = console.log("la condicion a evaluar en el if no es de tipo boolean")
        }
        if(value.value) {
            return this.cuerpo.execute(env);
        } else if(this.contrario != null) {
            return this.contrario.execute(env);
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodo_if"+aleatorio.toString();

        const cond: { codigorama:string, nombrenodo:string } = this.condicion.getAST();
        const contra: { codigorama:string, nombrenodo:string } = this.contrario.getAST();
        const instru: { codigorama:string, nombrenodo:string } = this.cuerpo.getAST();

        let bloque1 = { codigorama: "nodo", nombrenodo:"nodo[label=\"bloque if\"]" }
        let bloque2 = { codigorama: "nodo", nombrenodo:"nodo[label=\"bloque else\"]" }

        let block = "";

        if(this.condicion) {
            bloque1 = this.cuerpo.getAST();
        } else {
            bloque2 = this.cuerpo.getAST();
        }

        if(bloque1) {
            const codigorama = `
            ${nombreNodoP}[label="IF"];
            nodocondicion${nombreNodoP}[label="CONDICION"];
            nodoinstruccion${nombreNodoP}[label="INSTRUCCION"];
            ${cond.codigorama}
            ${instru.codigorama}
            ${nombreNodoP} -> nodocondicion${nombreNodoP};
            nodocondicion${nombreNodoP} -> ${cond.nombrenodo};
            ${nombreNodoP} -> nodoinstruccion${nombreNodoP};
            nodoinstruccion${nombreNodoP} -> ${instru.nombrenodo};
            `
            return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
        } else {
            const codigorama = `
            ${nombreNodoP}[label="ELSE"];
            nodoinstruccion${nombreNodoP}[label="INSTRUCCION"];
            ${instru.codigorama}
            ${nombreNodoP} -> nodoinstruccion${nombreNodoP};
            nodoinstruccion${nombreNodoP} -> ${instru.nombrenodo};
            `;
            return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
        }
    }
}