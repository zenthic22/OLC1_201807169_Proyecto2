import { Expression } from '../abstract/Expression';
import { Instruction } from '../abstract/Instruction';
import { Environment } from '../abstract/Environment';
import { Primitivo } from './Primitivo';
import { Acceso } from '../expression/Acceso';

export class IncrementoDecremento extends Instruction {
    private value: Expression;
    private accion: number;
    private id?: Acceso;

    constructor(
        accion: number,
        value: Expression,
        line: number,
        column: number,
        id?: Acceso
    ) {
        super(line, column);
        this.value = value;
        this.accion = accion;
        this.id = id;
    }

    public execute(env: Environment) {
        let identificador = this.id?.id;
        if(identificador != null) {
            let variableOriginal = env.getVar(identificador);
            let nuevoValor = this.value.execute(env);
            if(variableOriginal != null) {
                if(this.accion == 0) {
                    if(variableOriginal.type == 0 && nuevoValor.type == 1) {
                        variableOriginal.type = 1;
                        variableOriginal.valor = nuevoValor.value +1;
                        return { value: nuevoValor.value +1, type: nuevoValor.type }
                    } else if(variableOriginal.type == 1 && nuevoValor.type == 0) {
                        variableOriginal.type = 0;
                        variableOriginal.valor = nuevoValor.value +1;
                        return { value: nuevoValor.value +1, type: nuevoValor.type }
                    } else if(variableOriginal.type == nuevoValor.type) {
                        variableOriginal.valor = nuevoValor.value +1;
                        return { return: nuevoValor.value +1, type: nuevoValor.type }
                    }
                } else {
                    if(variableOriginal.type == 0 && nuevoValor.type == 1) {
                        variableOriginal.type = 1;
                        variableOriginal.valor = nuevoValor.value -1;
                        return { value: nuevoValor.value -1, type: nuevoValor.type }
                    } else if(variableOriginal.type == 1 && nuevoValor.type == 0) {
                        variableOriginal.type = 0;
                        variableOriginal.valor = nuevoValor.value -1;
                        return { value: nuevoValor.value -1, type: nuevoValor.type }
                    } else if(variableOriginal.type == nuevoValor.type) {
                        variableOriginal.valor = nuevoValor.value -1;
                        return { return: nuevoValor.value -1, type: nuevoValor.type }
                    }
                }
            }
        } else {
            let val = this.value.execute(env);
            //incremento
            if(this.accion == 0) {
                //tipo int, double
                if(val.type == 1) {
                    let inc = parseFloat(val.value) +1;
                    return { value: inc, type: val.type }
                } else if(val.type == 0) {
                    let inc = val.value +1;
                    return { value: inc, type: val.type }
                }
            } else {
                //tipo int, double
                if(val.type == 1) {
                    let inc = parseFloat(val.value) -1;
                    return { value: inc, type: val.type }
                } else if(val.type == 0) {
                    let inc = val.value -1;
                    return { value: inc, type: val.type }
                }
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        let acc = "++";
        if(this.accion == 1){
            acc="--";
        }
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodo_incremento"+aleatorio.toString();
        const valor:{codigorama:string ,nombrenodo:string} =this.value.getAST();
        if(this.id?.id != null){
            const ids:{codigorama:string ,nombrenodo:string} =this.id.getAST();
            const codigorama =` 
            ${nombreNodoP}[label ="INCREMENTO"];
            nodoincremento${nombreNodoP}[label="${acc}"];
            ${ids.codigorama}
            ${nombreNodoP} -> ${ids.nombrenodo};
            ${ids.nombrenodo} -> nodoincremento${nombreNodoP};
            `;
            return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        }else{
            const ids:{codigorama:string ,nombrenodo:string} =this.value.getAST();
            const codigorama =` 
            ${nombreNodoP}[label ="DECREMENTO"];
            nodoincremento${nombreNodoP}[label="${acc}"];
            ${ids.codigorama}
            ${nombreNodoP} ->${ids.nombrenodo};
            ${ids.nombrenodo} -> nodoincremento${nombreNodoP};
            `;
            return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
        }
    }
}