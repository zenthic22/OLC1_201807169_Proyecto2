import { Expression } from '../abstract/Expression';
import { Return, Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { TablaSuma, TablaResta, TablaPor, TablaDivision, TablaPot, TablaMod } from '../utils/TablaDominante';
import { TipoAritmetica } from '../utils/TipoAritmetica';

export class Aritmetica extends Expression {
    constructor(
        private izquierdo: Expression,
        private derecho: Expression,
        private tipoOperacion: TipoAritmetica,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment): Return {
        //verificar el tipo de operacion
        if(this.tipoOperacion == TipoAritmetica.SUMA) {
            //obtener los valores
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            //obtener el tipo de dato delos operandos
            const tipoDominante = TablaSuma[op1.type][op2.type];
            //verificar el tipo de dato
            switch(tipoDominante) {
                case Type.INT:
                    //verficar si algun operando es de tipo booleano
                    if(op1.type == Type.BOOLEAN) {
                        //convertir el valor a entero
                        op1.value = op1.value ? 1:0;
                    }
                    if(op2.type == Type.BOOLEAN) {
                        op2.value = op2.value ? 1:0;
                    }

                    //verificar si algun operando es de tipo caracter
                    if(op1.type == Type.CHAR) {
                        //convertir el valor a entero
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }

                    return { value: op1.value+op2.value, type: Type.INT }
                case Type.DOUBLE:
                    if(op1.type == Type.BOOLEAN) {
                        op1.value = op1.value ? 1:0;
                    }
                    if(op2.type == Type.BOOLEAN) {
                        op2.value = op2.value ? 1:0;
                    }

                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }

                    return { value: parseFloat(op1.value)+parseFloat(op2.value), type: Type.DOUBLE }
                case Type.STRING:
                    let stringIzq = op1.value.toString();
                    let stringDer = op2.value.toString();
                    return { value: stringIzq+stringDer, type: Type.STRING }
            }
        }//Resta
        else if(this.tipoOperacion == TipoAritmetica.RESTA) {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            const tipoDominante = TablaResta[op1.type][op2.type];
            switch(tipoDominante) {
                case Type.INT:
                    if(op1.type == Type.BOOLEAN) {
                        op1.value = op1.value ? 1:0;
                    }
                    if(op2.type == Type.BOOLEAN) {
                        op2.value = op2.value ? 1:0;
                    }

                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }
                    return { value: op1.value-op2.value, type: Type.INT }
                case Type.DOUBLE:
                    if(op1.type == Type.BOOLEAN) {
                        op1.value = op1.value ? 1:0;
                    }
                    if(op2.type == Type.BOOLEAN) {
                        op2.value = op2.value ? 1:0;
                    }
                    
                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }
                    return { value: parseFloat(op1.value)-parseFloat(op2.value), type: Type.DOUBLE }
                case Type.BOOLEAN:
                    if(op1.type == Type.BOOLEAN && op2.type == Type.INT) {
                        let boolIzq = op1.value ? 1:0;
                        return { value: boolIzq-op2.value, type: Type.INT }
                    } else if(op1.type == Type.BOOLEAN && op2.type == Type.DOUBLE) {
                        let boolIzq = op1.value ? 1:0;
                        return { value: boolIzq-op2.value, type: Type.DOUBLE }
                    }
                case Type.CHAR:
                    if(op1.type == Type.CHAR && op2.type == Type.INT) {
                        let charIzq = op1.value.charCodeAt(0);
                        return { value: charIzq-op2.value, type: Type.INT }
                    } else if(op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
                        let charIzq = op1.value.charCodeAt(0);
                        return { value: parseFloat(charIzq)-op2.value, type: Type.DOUBLE }
                    }
            }
        }//Multiplicacion
        else if(this.tipoOperacion == TipoAritmetica.MULTIPLICACION) {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            const tipoDominante = TablaPor[op1.type][op2.type];
            switch(tipoDominante) {
                case Type.INT:
                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }
                    return { value: op1.value*op2.value, type: Type.INT }
                case Type.DOUBLE:
                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }
                    return { value: parseFloat(op1.value)*parseFloat(op2.value), type: Type.DOUBLE }
                case Type.CHAR:
                    if(op1.type == Type.CHAR && op2.type == Type.INT) {
                        let asciiIzq = op1.value.charCodeAt(0);
                        return { value: asciiIzq/op2.value, type: Type.DOUBLE }
                    } else if(op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
                        let asciiIzq = op1.value.charCodeAt(0);
                        return { value: parseFloat(asciiIzq)/op2.value, type: Type.DOUBLE }
                    }
            }
        }//Division
        else if(this.tipoOperacion == TipoAritmetica.DIVISION) {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            const tipoDominante = TablaDivision[op1.type][op2.type];
            switch(tipoDominante) {
                case Type.INT:
                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }
                    return { value: op1.value/op2.value, type: Type.DOUBLE }
                case Type.DOUBLE:
                    if(op1.type == Type.CHAR) {
                        op1.value = op1.value.charCodeAt(0);
                    }
                    if(op2.type == Type.CHAR) {
                        op2.value = op2.value.charCodeAt(0);
                    }
                    return { value: op1.value/op2.value, type: Type.DOUBLE }
                case Type.CHAR:
                    if(op1.type == Type.CHAR && op2.type == Type.INT) {
                        let asciiIzq = op1.value.charCodeAt(0);
                        return { value: asciiIzq/op2.value, type: Type.DOUBLE }
                    } else if(op1.type == Type.CHAR && op2.type == Type.DOUBLE) {
                        let asciiIzq = op1.value.charCodeAt(0);
                        return { value: parseFloat(asciiIzq)/op2.value, type: Type.DOUBLE }
                    }
            }
        }//Potencia
        else if(this.tipoOperacion == TipoAritmetica.POTENCIA) {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            const tipoDominante = TablaPot[op1.type][op2.type];
            switch(tipoDominante) {
                case Type.INT:
                    if(op1.type == Type.INT && op2.type == Type.INT) {
                        return { value: Math.pow(op1.value, op2.value), type: Type.INT }
                    } else if(op1.type == Type.INT && op2.type == Type.DOUBLE) {
                        return { value: Math.pow(parseFloat(op1.value), op2.value), type: Type.DOUBLE }
                    }
                case Type.DOUBLE:
                    return { value: Math.pow(parseFloat(op1.value),parseFloat(op2.value)), type: Type.DOUBLE }
            }
        }//Modulo
        else if(this.tipoOperacion == TipoAritmetica.MODULO) {
            const op1 = this.izquierdo.execute(env);
            const op2 = this.derecho.execute(env);
            const tipoDominante = TablaMod[op1.type][op2.type];
            switch(tipoDominante) {
                case Type.INT:
                    return { value: parseFloat(op1.value)%parseFloat(op2.value), type: Type.DOUBLE }
                case Type.DOUBLE:
                    return { value: parseFloat(op1.value)%parseFloat(op2.value), type: Type.DOUBLE }
            }
        }
        //Unario
        else if(this.tipoOperacion == TipoAritmetica.MENOSUNARIO) {
            const op2 = this.izquierdo.execute(env);
            if(op2.type == Type.INT) {
                return { value: -op2.value, type: Type.INT }
            } else if(op2.type == Type.DOUBLE) {
                return { value: -op2.value, type: Type.DOUBLE }
            }
        }
        return { value: null, type: Type.NULL }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        let tipo ="SUMA";
        if(this.tipoOperacion == TipoAritmetica.RESTA){
             tipo ="RESTA";
        } else if(this.tipoOperacion == TipoAritmetica.MULTIPLICACION){
                 tipo ="MULTIPLICACION";
        }
        else if(this.tipoOperacion == TipoAritmetica.DIVISION){
             tipo ="DIVISION"
        }
        else if(this.tipoOperacion == TipoAritmetica.MENOSUNARIO){
             tipo ="MENOSUNARIO";
        }else if(this.tipoOperacion == TipoAritmetica.POTENCIA){
                 tipo ="POTENCIA";
        }
        else if(this.tipoOperacion == TipoAritmetica.MODULO){
                 tipo ="MODULO";
        }
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodoaritmetica"+aleatorio.toString();
        const exiz:{codigorama:string ,nombrenodo:string} =this.izquierdo.getAST();
        const exder:{codigorama:string ,nombrenodo:string} =this.derecho.getAST();
        const codigorama =` 
        ${nombreNodoP}[label ="ARITMETICA"];
        nodooperacion${nombreNodoP}[label="${tipo}"];
        ${exiz.codigorama}
        ${exder.codigorama}
        ${nombreNodoP} ->${exiz.nombrenodo};
        ${nombreNodoP} -> nodooperacion${nombreNodoP};
        ${nombreNodoP} ->${exder.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}