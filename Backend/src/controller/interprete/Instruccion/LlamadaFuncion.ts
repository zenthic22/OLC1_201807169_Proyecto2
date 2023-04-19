import { Instruccion } from './Instruccion';
import { Ambito } from '../Mas/Ambito';
import { Expresion } from '../Expresion/Expresion';

export class LlamadaFuncion extends Instruccion {
    constructor(
        private id: string,
        private expresiones: Array<Expresion>,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        var bandera = false;
        const func = ambito.getFuncion(this.id);
        if (func == undefined){
            let er = console.log("error")
            throw er;
        }
        if (this.expresiones.length != func.parametros.length){
            let er = console.log("error")
            throw er;
        }

        const newEnv = new Ambito(ambito.getGlobal());
        if(this.expresiones.length !=0 && func.parametros.length !=0){
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].execute(ambito);
                const auxval = func.parametros[i];
                if(parseInt(auxval[0]) == value.type || (auxval[0]== 0 &&  value.type ==3) || (auxval[0]== 3 &&  value.type ==0 ) ){
                    newEnv.createVar(auxval[1], value.value, value.type, this.line, this.column,null);
                }else{
                    let er = console.log("error")
                    throw er;
                }
                
            }
        }
        
        const  retornar = func.statement.execute(newEnv);
        if( retornar !=undefined ){
            if(retornar.type =='Return' ){
                //const r = retornar.expresion.execute(ambito);
                bandera = true;
                if(func.subrutina == 8){
                    let er = console.log("error")
                    throw er;
                }else {
                    return {value:retornar.value , type:retornar.tipo};
                }
               
            }    
        }

        if(bandera == false){
            if(func.subrutina == 7){
                let er = console.log("error")
                throw er;
            }
        }
    }
}