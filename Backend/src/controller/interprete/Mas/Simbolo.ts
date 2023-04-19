import { Retorno, Type } from '../Expresion/Retorno';

export class Simbolo {
    public valor: any;
    public id: string;
    public type: Type;
    public tamanio: number;
    public edd: Type|undefined;

    constructor(valor: any, id: string, type: any, tamanio?: any, edd?: Type) {
        this.valor = valor;
        this.id = id;
        this.type = type;
        this.tamanio = tamanio;
        this.edd = edd;
    }
}