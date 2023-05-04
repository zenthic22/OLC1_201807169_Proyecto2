import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

export class AccesoLista extends Expression {
    constructor(
        public id: string,
        public posicion: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        let value = env.getVar(this.id);
        if(value != null) {
            let pos = this.posicion.execute(env);
            if(pos.value < value.valor.length) {
                if(value.valor != null) {
                    let v = value.valor[pos.value].execute(env);
                    let va = v.value;
                    return { value: va, type: value.type }
                } else {
                    return { value: null, type: value.type }
                }
            } else {
                throw "no se encontro en el indice";
            }
        } else {
            throw "no se encuentra lista";
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoaccesolista"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="ACCESOLISTA"];
        nodoval_lst${nombreNodoP}[label="${this.id}"];
        nodopos_lst${nombreNodoP}[label="${this.posicion}"];
        ${nombreNodoP} -> nodoval_lst${nombreNodoP} -> nodopos_lst${nombreNodoP};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}