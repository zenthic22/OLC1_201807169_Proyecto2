import { Expresion } from '../Expresion/Expresion';
import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';

export class Casteo extends Instruccion {
    private value: Expresion; //valor
    private cast: number; //tipo de casteo

    constructor(
        cast: number,
        value: Expresion,
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
        this.cast = cast;
    }

    public execute(ambito: Ambito) {
        let val = this.value?.execute(ambito);
        //Int a double
        // Char a double
        if(this.cast == 3){
            if(val?.type == 0 || val?.type == 4){
                if( val?.type == 4){
                    return {value:parseFloat(val?.value.charCodeAt(0)),type:this.cast}
                }else{
                     return { value:parseFloat(val?.value) , type:this.cast }
                }
               
            }else{
                let er = console.log("error")
                throw er;
            }
        }
        // Double a Int 
        // Char a int
        else if(this.cast == 0){
            if(val?.type == 3 || val?.type == 4){
                if( val?.type == 4){
                    return {value: parseInt(val?.value.charCodeAt(0)),type:this.cast}
                }
                else{
                    return { value: parseInt(val?.value) , type:this.cast }
                }
               
            }else{
                let er = console.log("error")
                throw er;
            }
        }
        // Int a String
        // Double a String
        else if(this.cast == 1){
            if(val?.type == 0 || val?.type == 3){
                return { value: (val?.value).toString() , type:this.cast }
                }else{
                    let er = console.log("error")
                    throw er;
                }
            }
        // Int a Char
        else if( this.cast == 4){
            if(val?.type == 0 ){
                return { value: String.fromCharCode(val?.value).toString() , type:this.cast }
            }else{
                let er = console.log("error")
                throw er;
            }
        }
    }
}