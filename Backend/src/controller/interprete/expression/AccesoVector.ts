import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';

export class AccesoVector extends Expression {
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
        console.log("acceso vector: "+this.id);
        if(value != null) {
            let pos = this.posicion.execute(env);
            if(pos.value < value.tamanio) {
                console.log("valor: "+pos.value);
                console.log("posicion: "+pos.value);
                if(value.valor != null) {
                    let v = value.valor[pos.value].execute(env);
                    let va = v.value;
                    console.log("valores 1: "+va);
                    return { value: va, type: value.type }
                } else {
                    return { value: null, type: value.type }
                }
            } else {
                throw "indice fuera de limite";
            }
        } else {
            throw "ojo";
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoaccesovector"+aleatorio.toString();
        const codigorama =` 
        ${nombreNodoP}[label ="ACCESOVECTOR"];
        nodoval_vector${nombreNodoP}[label="${this.id}"];
        nodopos_vec${nombreNodoP}[label="${this.posicion}"];
        ${nombreNodoP} -> nodoval${nombreNodoP} -> nodopos_vec${nombreNodoP};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}