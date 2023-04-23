import { Environment } from '../abstract/Environment';
import { Instruction } from '../abstract/Instruction';

export class Statement extends Instruction {
    constructor(
        private code: Instruction[],
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(env: Environment) {
        const nuevoAmbito = new Environment(env);
        for(const inst of this.code) {
            try {
                const element = inst.execute(nuevoAmbito);
                if(element != null && element != undefined) {
                    return element;
                }
            } catch(error) {
                console.log(error);
            }
        }
    }
}