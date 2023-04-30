import { Instruction } from "../abstract/Instruction";
import { Expression } from "../abstract/Expression";
import { printlist } from "../Reports/PrintList";
import { Environment } from "../abstract/Environment";

export class Print extends Instruction {
    private value: Expression[];

    constructor(
        value: Expression[],
        line: number,
        column: number
    ) {
        super(line, column);
        this.value = value;
    }

    public execute(env: Environment): any {
        for(const actual of this.value) {
            const val = actual.execute(env);
            printlist.push(val.value);
            console.log("desde consola: ", val.value);
        }
    }
}