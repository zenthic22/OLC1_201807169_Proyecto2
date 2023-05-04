import { Expression } from '../abstract/Expression';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

let contador:number = 0;

export class LlamadaFuncion extends Instruction {
    constructor(
        private id: string,
        private argumentos: Array<Expression>,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        var bandera = false;
        const func = env.getFuncion(this.id)
        if(func == undefined) {
            throw "funcion no encontrada";
        }

        if(this.argumentos.length != func.parametros.length) {
            throw "numero de parametros no coinciden";
        }

        const newEnv = new Environment(env.getGlobal());
        if(this.argumentos.length != 0 && func.parametros.length != 0) {
            for(let i=0; i<this.argumentos.length; i++) {
                const value = this.argumentos[i].execute(env);
                const auxVal = func.parametros[i];
                if(parseInt(auxVal[0]) == value.type || (auxVal[0] == 0 && value.type == 1) || (auxVal[0] == 1 && value.type == 0)) {
                    newEnv.guardar(auxVal[1], value.value ,value.type, this.line, this.column, null);
                }
            }
        }
        const retornar = func.statement.execute(newEnv);
        if(retornar != undefined) {
            if(retornar.type == 'Return') {
                bandera = true;
                if(func.subrutina == 8) {
                    throw "el metodo es de tipo void";
                } else {
                    return { value: retornar.value, type: retornar.tipo }
                }
            }
        }

        if(bandera == false) {
            if(func.subrutina == 7) {
                throw "es necesario un retorno";
            }
        }
    }

    public getAST(): { codigorama: string; nombrenodo: string; } {
        const id = Math.floor(Math.random()*(1000-0)+0);
      //generar el nombre del nodo
      const nodoPrincipal = `nodoCall${id.toString()}`;
      const nodoArg = `nodoArg${id.toString()}`;
      const nodoCall = `nodoIC${id.toString()}`;
      let ramaCall = `${nodoCall}[label = "Llamada"];\n`;
      ramaCall += `${nodoPrincipal}[label = "${this.id}"];\n`;
      ramaCall += `${nodoArg}[label = "Argumentos"];\n`;
      ramaCall += `${nodoCall} -> ${nodoPrincipal};\n`;
      ramaCall += `${nodoPrincipal} -> ${nodoArg};\n`;
      for(let i = 0; i < this.argumentos.length; i++){
        const codigoArg : { codigorama: string, nombrenodo: string } = this.argumentos[i].getAST();
        ramaCall += codigoArg.codigorama + "\n";
        ramaCall += `${nodoArg} -> ${codigoArg.nombrenodo};\n`;
      }

      return {codigorama: ramaCall, nombrenodo: nodoCall}
    }
}