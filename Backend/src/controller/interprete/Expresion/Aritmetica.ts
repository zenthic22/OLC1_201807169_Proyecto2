import { Expresion } from './Expresion';
import { Retorno, Type } from './Retorno';
import { Ambito } from '../Mas/Ambito';

export class Aritmetica extends Expresion {
    public izquierda: string;
    public derecha: string;
    public operacion: string;

    constructor(
        private left: Expresion,
        private right: Expresion,
        private tipo: TipoAritmetica,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);

        this.izquierda = leftValue.value.toString();
        this.derecha = rightValue.value.toString();

        // SUMA
        if (this.tipo == TipoAritmetica.SUMA) {
            this.operacion ="+";
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value + rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) + rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (leftValue.value + 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value + 0), type: Type.ENTERO };
                }
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value + ascii), type: Type.ENTERO }; 
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CADENA){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) + parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) + parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (parseFloat(leftValue.value) + 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value + 0), type: Type.DOUBLE };
                }
            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value + parseFloat(ascii)), type:  Type.DOUBLE }; 
            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CADENA){
                
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } 
            // OPERADOR 1 BOOLEAN
            else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.ENTERO){
                if(leftValue.value==='true'){return { value: 1 + rightValue.value , type: Type.ENTERO };}
                else {
                    return { value: 0 + rightValue.value, type: Type.ENTERO};
                }
            } else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.DOUBLE){
                if(leftValue.value==='true'){return { value: 1 + rightValue.value , type: Type.DOUBLE };}
                else {
                    return { value: 0 + rightValue.value, type: Type.DOUBLE};
                }
            } else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.CADENA){
                
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (rightValue.value + ascii), type: Type.ENTERO }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (rightValue.value + parseFloat(ascii)), type: Type.DOUBLE }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.CARACTER){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA};

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.CADENA){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            }
             // OPERADOR 1 CADENA
            else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 

            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.DOUBLE){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 

            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.BOOLEANO){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.CARACTER){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 

            } else if(leftValue.type == Type.CADENA &&  rightValue.type == Type.CADENA){
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Type.CADENA }; 
            }else {
                let er = console.log("error")
                throw er;
            }

        } else if (this.tipo == TipoAritmetica.RESTA) {
            this.operacion ="-";
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value - rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) - rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (leftValue.value - 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value - 0), type: Type.ENTERO };
                }
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value - ascii), type: Type.ENTERO }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) - parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) - parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.BOOLEANO){
                if(rightValue.value==='true'){return { value: (parseFloat(leftValue.value) - 1), type: Type.DOUBLE };}
                else {
                    return { value: (leftValue.value - 0), type: Type.DOUBLE };
                }
            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value - parseFloat(ascii)), type:  Type.DOUBLE }; 
            } 
            // OPERADOR 1 BOOLEAN
            else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.ENTERO){
                if(leftValue.value==='true'){return { value: 1 - rightValue.value , type: Type.ENTERO };}
                else {
                    return { value: 0 - rightValue.value, type: Type.ENTERO};
                }
            } else if(leftValue.type == Type.BOOLEANO &&  rightValue.type == Type.DOUBLE){
                if(leftValue.value==='true'){return { value: 1 - rightValue.value , type: Type.DOUBLE };}
                else {
                    return { value: 0 - rightValue.value, type: Type.DOUBLE};
                }
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (ascii - rightValue.value  ), type: Type.ENTERO }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: ( parseFloat(ascii)-rightValue.value ), type: Type.DOUBLE }; 
            }
            else {
                let er = console.log("error")
                throw er;  
            } 
        }
        // MULTIPLICACION 
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            // OPERADOR 1 ENTERO 
            this.operacion ="*";
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value * rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) * rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value * ascii), type: Type.ENTERO }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) * parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) * parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value * parseFloat(ascii)), type:  Type.DOUBLE }; 
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (ascii * rightValue.value  ), type: Type.ENTERO }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: ( parseFloat(ascii)*rightValue.value ), type: Type.DOUBLE }; 
            }
            else {
                let er = console.log("error")
                throw er;
            } 
        }
        // DIVISION 
        else if (this.tipo == TipoAritmetica.DIVISION) {
            this.operacion ="/";
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value  /rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) / rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.CARACTER){
                let ascii =  rightValue.value.charCodeAt(0);
                return { value: (leftValue.value / ascii), type: Type.DOUBLE }; 
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) / parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) / parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.CARACTER){
                let ascii = rightValue.value.charCodeAt(0);
                return { value: (leftValue.value / parseFloat(ascii)), type:  Type.DOUBLE }; 
            } 
            // OPERADOR 1 CARACTER 
            else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.ENTERO){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: (ascii / rightValue.value  ), type: Type.DOUBLE }; 

            } else if(leftValue.type == Type.CARACTER &&  rightValue.type == Type.DOUBLE){
                let ascii = leftValue.value.charCodeAt(0);
                return { value: ( parseFloat(ascii) / rightValue.value ), type: Type.DOUBLE }; 
            }
            else {
                let er = console.log("error")
                throw er;
            } 
        // POTENCIA 
        }else if (this.tipo == TipoAritmetica.POTENCIA) {
            this.operacion ="^";
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: Math.pow(leftValue.value ,rightValue.value), type: Type.ENTERO };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: Math.pow(parseFloat(leftValue.value) , rightValue.value), type: Type.DOUBLE };
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: Math.pow(parseFloat(leftValue.value) , parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: Math.pow(parseFloat(leftValue.value) , parseFloat(rightValue.value)), type: Type.DOUBLE };

            } 
            else {
                let er = console.log("error")
                throw er;
            } 
        }
        // MODULO 
        else if (this.tipo == TipoAritmetica.MODULO){
            this.operacion ="%";
            // OPERADOR 1 ENTERO 
            if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.ENTERO){
                return { value: (leftValue.value  %rightValue.value), type: Type.DOUBLE };
            } else if(leftValue.type == Type.ENTERO &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) % rightValue.value), type: Type.DOUBLE };
            } 
            // OPERADOR 1 DOUBLE 
            else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.ENTERO){
                return { value: (parseFloat(leftValue.value) % parseFloat(rightValue.value)), type: Type.DOUBLE };

            } else if(leftValue.type == Type.DOUBLE &&  rightValue.type == Type.DOUBLE){
                return { value: (parseFloat(leftValue.value) % parseFloat(rightValue.value)), type: Type.DOUBLE };

            } 
            else {
                let er = console.log("error")
                throw er;
            } 
        }else {
            let er = console.log("error")
            throw er;
        }
    }
}

export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MENOSUNARIO,
    POTENCIA,
    MODULO
}