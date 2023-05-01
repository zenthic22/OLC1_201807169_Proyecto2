import { Simbolo } from './Symbol';
import { Type } from './Return';
import { printlist } from '../Reports/PrintList';
import { Funcion } from '../instruction/Funcion';

export class Environment {
    private variables = new Map<string, Simbolo>; //mapa de variables
    private funciones = new Map<string, Funcion>; //mapa de funciones

    //constructor
    constructor(private anterior: Environment | null) {
        this.variables = new Map();
        this.funciones = new Map();
    }

    //guardar un arreglo
    public guardar_array(id:string, value:any, type: Type, line: number, column:number, tamanio:any, edd?:Type) {
        let env: Environment | null = this;
        let tam = tamanio;
        while(env != null) {
            if(env.variables.has(id.toLowerCase())) {
                const val = env.variables.get(id.toLowerCase());
                if(val?.type == type) {
                    env.variables.set(id.toLowerCase(), new Simbolo(value, id, type, tam, edd));
                } else {
                    throw "nop, wenas tardes :D";
                }
            }
            env = env.anterior;
        }
    }

    //guardar una nueva variable
    public guardar(id:string, valor:any, tipo:Type, linea:number, columna:number, tamanio:any, edd?:Type) {
        //verificar el ambito
        let env: Environment | null = this;
        let tam = tamanio;
  
        // verificar si la variable ya existe
        if (!env.variables.has(id.toLowerCase())) {
            // guardar la variable
            // guardar la variable en una tabla de simbolos para el reporte
            env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo, tam, edd));
        }
    }

    //obtener una variable
    public getVar(id:string): Simbolo | undefined | null {
        //verificar el ambito
        let env: Environment | null = this;
        //buscar la variable en el entorno actual
        while(env != null) {
            //verificar si la variable existe
            if(env.variables.has(id.toLowerCase())) {
                return env.variables.get(id.toLowerCase());
            }
            //buscar en el entorno anterior
            env = env.anterior;
        }
        return null;
    }

    public guardarFuncion(id:string, funcion:Funcion, line:number, column: number, subr:number, type: Type) {
        let env: Environment | null = this;
        if(!env.funciones.has(id.toLowerCase())) {
            this.funciones.set(id.toLowerCase(), funcion);
        }
    }

    public getFuncion(id: string): Funcion | undefined {
        let env: Environment | null = this;
        while(env != null) {
            if(env.funciones.has(id.toLowerCase())) {
                return env.funciones.get(id.toLowerCase());
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal(): Environment {
        let env: Environment | null = this;
        while(env?.anterior != null) {
            env = env?.anterior;
        }
        return env;
    } 
}