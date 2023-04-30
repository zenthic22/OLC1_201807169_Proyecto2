import { Instruction } from '../abstract/Instruction';

export class Union {
    private static objeto: Union;
    private ast: string = "";
    private entorno: string = "";
    private consola: string = "";
    private arr: Instruction[] = [];

    public static getInstance(): Union {
        if(!Union.objeto) {
            Union.objeto = new Union();
        }
        return Union.objeto;
    }

    public add_ast(data:string) {
        this.ast += data;
    }

    public get_ast():string {
        return this.ast;
    }

    public add_consola(data:string) {
        this.consola += data;
    }

    public get_consola(): string {
        return this.consola;
    }

    public add_pila(data: Instruction) {
        this.arr.push(data)
    }

    public add_entorno(data:string) {
        this.entorno += data;
    }

    public get_entorno():string {
        return this.entorno;
    }

    public clear_ast() {
        this.ast = "";
    }

    public clear_consola() {
        this.consola = "";
    }

    public clear_entorno() {
        this.entorno = "";
    }
}