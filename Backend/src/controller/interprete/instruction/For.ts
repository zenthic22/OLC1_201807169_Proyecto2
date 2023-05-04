import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

let contador:number = 0;

export class For extends Instruction {
    private Declaracion1:Expression;
    private condicion: Expression;
    private incremento: Expression;
    private cuerpo: Instruction;

    constructor(
        Declaracion1: Expression,
        condicion: Expression,
        incremento: Expression,
        cuerpo: Instruction,
        line: number,
        column: number
    ) {
        super(line, column);
        this.Declaracion1 = Declaracion1;
        this.condicion = condicion;
        this.incremento = incremento;
        this.cuerpo = cuerpo;
    }

    public execute(env: Environment) {
        this.Declaracion1.execute(env);
        const valorcondicion = this.condicion.execute(env);
        let contador = 0;
        if(valorcondicion.type != Type.BOOLEAN) {
            let err = console.log("la condicion a evaluar no es de tipo boolean")
            throw err;
        }
        while(true) {
            const valorcondicion = this.condicion.execute(env);
            if(valorcondicion != null && valorcondicion != undefined) {
                if(!valorcondicion.value) {
                    break;
                }
            }
            const retorno = this.cuerpo.execute(env);
            if(retorno != null && retorno != undefined) {
                if(retorno.type == 'Break') {
                    break;
                } else if(retorno.type == 'Continue') {
                    continue;
                } else if(retorno.type == 'Return') {

                }
            }
            if(contador == 1000) {
                break;
            }
            this.incremento.execute(env);
            contador++;
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodo_for"+aleatorio.toString();

        const declaracion: { codigorama:string, nombrenodo:string } = this.Declaracion1.getAST();
        const cond: { codigorama: string, nombrenodo:string } = this.condicion.getAST();
        const incre: { codigorama: string, nombrenodo:string } = this.incremento.getAST();
        const instru: { codigorama: string, nombrenodo:string } = this.cuerpo.getAST();

        const codigorama = `
        ${nombreNodoP}[label="FOR"];
        nododeclaracion${nombreNodoP}[label="DECLARACION"];
        nodocondicion${nombreNodoP}[label="CONDICION"];
        nodoincremento${nombreNodoP}[label="INCREMENTO"];
        nodoinstruccion${nombreNodoP}[label="INSTRUCCION"];
        ${declaracion.codigorama}
        ${cond.codigorama}
        ${incre.codigorama}
        ${instru.codigorama}
        ${nombreNodoP} -> nododeclaracion${nombreNodoP};
        nododeclaracion${nombreNodoP} -> ${declaracion.nombrenodo};
        ${nombreNodoP} -> nodocondicion${nombreNodoP};
        nodocondicion${nombreNodoP} -> ${cond.nombrenodo};
        ${nombreNodoP} -> nodoincremento${nombreNodoP};
        nodoincremento${nombreNodoP} -> ${incre.nombrenodo};
        ${nombreNodoP} -> nodoinstruccion${nombreNodoP};
        nodoinstruccion${nombreNodoP} -> ${instru.nombrenodo};
        `
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}