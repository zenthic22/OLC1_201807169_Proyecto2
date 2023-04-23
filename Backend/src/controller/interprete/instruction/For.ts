import { Expression } from '../abstract/Expression';
import { Type } from '../abstract/Return';
import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class For extends Instruction {
    private Declaracion1:Expression;
    private condicion: Expression;
    private incremento: Expression;
    private cuerpo: Instruction;

    constructor(
        Declaracion1: Expression,
        condicion: Expression,
        incremento: Expression,
        cuerpo: Instruction,
        line: number,
        column: number
    ) {
        super(line, column);
        this.Declaracion1 = Declaracion1;
        this.condicion = condicion;
        this.incremento = incremento;
        this.cuerpo = cuerpo;
    }

    public execute(env: Environment) {
        this.Declaracion1.execute(env);
        const valorcondicion = this.condicion.execute(env);
        let contador = 0;
        if(valorcondicion.type != Type.BOOLEAN) {
            let err = console.log("la condicion a evaluar no es de tipo boolean")
            throw err;
        }
        while(true) {
            const valorcondicion = this.condicion.execute(env);
            if(valorcondicion != null && valorcondicion != undefined) {
                if(!valorcondicion.value) {
                    break;
                }
            }
            const retorno = this.cuerpo.execute(env);
            if(retorno != null && retorno != undefined) {
                if(retorno.type == 'Break') {
                    break;
                } else if(retorno.type == 'Continue') {
                    continue;
                } else if(retorno.type == 'Return') {

                }
            }
            if(contador == 1000) {
                break;
            }
            this.incremento.execute(env);
            contador++;
        }
    }
}