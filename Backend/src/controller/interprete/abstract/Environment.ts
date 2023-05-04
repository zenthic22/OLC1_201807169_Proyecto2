import { Simbolo } from './Symbol';
import { Type } from './Return';
import { printlist } from '../Reports/PrintList';
import { Funcion } from '../instruction/Funcion';
import { ListaTabla } from '../Reports/ListaTabla';
import { TablaSimbolos } from './TablaSimbolos';

export class Environment {
    private variables = new Map<string, Simbolo>(); //mapa de variables
    private funciones = new Map<string, Funcion>(); //mapa de funciones

    //constructor
    constructor(private anterior: Environment | null) {
        this.variables = new Map<string, Simbolo>();
        this.funciones = new Map<string, Funcion>();
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
            if(edd != undefined) {
                this.guardarlistatabla(id, tipo, edd, "ambito", linea, columna);
            } else {
                this.guardarlistatabla(id, tipo, 10, "ambito", linea, columna);
            }
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
            this.guardarlistatabla(id, type, subr, "--", line, column);
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

    public guardarlistatabla(id:string, tipo1:number, tipo2:number, ambito:string, linea:number, columna:number) {
        if(tipo2 == 6) {
            if(tipo1 == 4) {
                ListaTabla.push(new TablaSimbolos(id, "STRING", "VECTOR", ambito, linea, columna));
            } else if(tipo1 == 2) {
                ListaTabla.push(new TablaSimbolos(id, "BOOLEAN", "VECTOR", ambito, linea, columna));
            } else if(tipo1 == 1) {
                ListaTabla.push(new TablaSimbolos(id, "DOUBLE", "VECTOR", ambito, linea, columna));
            } else if(tipo1 == 3) {
                ListaTabla.push(new TablaSimbolos(id, "CHAR", "VECTOR", ambito, linea, columna));
            } else {
                ListaTabla.push(new TablaSimbolos(id, "INT", "VECTOR", ambito, linea, columna));
            }
        } else if(tipo2 == 7) {
            if(tipo1 == 4) {
                ListaTabla.push(new TablaSimbolos(id, "STRING", "LISTA", ambito, linea, columna));
            } else if(tipo1 == 2) {
                ListaTabla.push(new TablaSimbolos(id, "BOOLEAN", "LISTA", ambito, linea, columna));
            } else if(tipo1 == 1) {
                ListaTabla.push(new TablaSimbolos(id, "DOUBLE", "LISTA", ambito, linea, columna));
            } else if(tipo1 == 3) {
                ListaTabla.push(new TablaSimbolos(id, "CHAR", "LISTA", ambito, linea, columna));
            } else {
                ListaTabla.push(new TablaSimbolos(id, "INT", "LISTA", ambito, linea, columna));
            }
        } else if(tipo2 == 8) {
            if(tipo1 == 4) {
                ListaTabla.push(new TablaSimbolos(id, "STRING", "FUNCION", ambito, linea, columna));
            } else if(tipo1 == 2) {
                ListaTabla.push(new TablaSimbolos(id, "BOOLEAN", "FUNCION", ambito, linea, columna));
            } else if(tipo1 == 1) {
                ListaTabla.push(new TablaSimbolos(id, "DOUBLE", "FUNCION", ambito, linea, columna));
            } else if(tipo1 == 3) {
                ListaTabla.push(new TablaSimbolos(id, "CHAR", "FUNCION", ambito, linea, columna));
            } else {
                ListaTabla.push(new TablaSimbolos(id, "INT", "FUNCION", ambito, linea, columna));
            }
        } else if(tipo2 == 9) {
            ListaTabla.push(new TablaSimbolos(id, "VOID", "METODO", ambito, linea, columna));
        } else {
            if(tipo1==1){
                ListaTabla.push(new TablaSimbolos(id,"STRING","VARIABLE",ambito,linea,columna ));
            }else if(tipo1 == 2){
                ListaTabla.push(new TablaSimbolos(id,"BOOLEAN","VARIABLE",ambito,linea,columna ));
            }else if(tipo1==3){
                ListaTabla.push(new TablaSimbolos(id,"DOUBLE","VARIABLE",ambito,linea,columna ));
            }else if(tipo1==4){
                ListaTabla.push(new TablaSimbolos(id,"CHAR","VARIABLE",ambito,linea,columna ));
            }else {
                ListaTabla.push(new TablaSimbolos(id,"INT","VARIABLE",ambito,linea,columna ));
            }
        }
    }
}   