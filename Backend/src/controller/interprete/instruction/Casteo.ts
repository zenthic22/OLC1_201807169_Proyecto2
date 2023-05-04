import { Instruction } from '../abstract/Instruction';
import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Type } from '../abstract/Return';

let contador:number = 0;

export class Casteo extends Instruction {
    private value: Expression;
    private cast: number;

    constructor(
        cast: number,
        value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
        this.cast = cast;
    }

    /*INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4,
    NULL = 5*/

    public execute(env: Environment) {
        let val = this.value.execute(env);
        //Int a Double
        //Char a double
        if(this.cast == 1) {
            if(val.type == 0 || val.type == 3) {
                if(val.type == 3) {
                    return { value: parseFloat(val.value.charCodeAt(0)), type: this.cast }
                } else {
                    return { value: parseFloat(val.value), type: this.cast }
                }
            }
        }
        //Double a Int
        //Char a Int
        else if(this.cast == 0) {
            if(val.type == 1 || val.type == 3) {
                if(val.type == 3) {
                    return { value: parseInt(val.value.charCodeAt(0)), type:this.cast }
                } else {
                    return { value: parseInt(val.value), type: this.cast }
                }
            }
        }
        //Int a String
        //Double a String
        else if(this.cast == 4) {
            if(val.type == 0 || val.type == 1) {
                return { value: (val.value).toString(), type: this.cast }
            }
        }
        //Int a Char
        else if(this.cast == 3) {
            if(val.type == 0) {
                return { value: String.fromCharCode(val.value).toString(), type: this.cast }
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        let tipo = "BOOLEANO";
        if (this.cast == 4){
            tipo ="CADENA";
        }else if (this.cast == 0) {
            tipo ="ENTERO";
        } else if (this.cast== 1) {
            tipo ="DOULBE";
        } else if (this.cast == 3) {
            tipo ="CARACTER";
        }
        const aleatorio = Math.floor(Math.random() * (100-0)+0);
        let nombreNodoP= "nodocasteo"+aleatorio.toString();
        const val:{codigorama:string ,nombrenodo:string}=this.value.getAST();
        
        
        const codigorama =` 
        ${nombreNodoP}[label ="CAST"];
        nodotipo${nombreNodoP}[label="${tipo}"];
        ${val.codigorama}
        ${nombreNodoP} -> nodotipo${nombreNodoP} ->${val.nombrenodo};
        `;
        return {codigorama:codigorama , nombrenodo:nombreNodoP.toString()}
    }
}