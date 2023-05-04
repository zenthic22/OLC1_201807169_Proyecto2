import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

let contador:number = 0;

export class SwitchCase extends Instruction {
    constructor(
        private condicion: Expression,
        private cuerpo: any,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        const condicion_evaluar = this.condicion.execute(env);
        for(var i=0; i<this.cuerpo.length; i++) {
            var bandera_default = false;
            var bandera_break = false;
            const aux = this.cuerpo[i];
            const valorcondicion = aux[0].execute(env);
            if(condicion_evaluar.value == valorcondicion.value || valorcondicion.type == 'Default') {
                const auxval = aux[1];
                const retorno = auxval.execute(env);
                if(retorno != undefined || retorno != null) {
                    if(retorno.type == 'Break') {
                        bandera_break = true;
                    }
                }
            }
            if(bandera_break) {
                break;
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random()*(100-0)+0);
        let nombreNodoP = "nodoswitch"+aleatorio.toString();

        var cond: { codigorama:string, nombrenodo:string } = this.condicion.getAST();
        var instru: { codigorama:string, nombrenodo:string } = this.cuerpo.getAST();

        const codigorama = `
        ${nombreNodoP}[label="SWITCH"];
        nodocondicion${nombreNodoP}[label="CONDICION"];
        ${cond.codigorama}
        ${instru.codigorama}
        ${nombreNodoP} -> nodocondicion${nombreNodoP} -> ${cond.nombrenodo};
        ${nombreNodoP} -> ${instru.nombrenodo};
        `
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()};
    }
}