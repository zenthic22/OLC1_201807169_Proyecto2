//importamos librerias
import { Request, Response } from 'express';
import { printlist } from './interprete/Reports/PrintList';
import { Environment } from './interprete/abstract/Environment';
import { Instruction } from './interprete/abstract/Instruction';
import { Expression } from './interprete/abstract/Expression';
import { Union } from './interprete/utils/Union';
import { Funcion } from './interprete/instruction/Funcion';
import { Main } from './interprete/instruction/Main';
import { exec } from 'child_process';
import { stderr, stdout } from 'process';
import { ListaTabla } from './interprete/Reports/ListaTabla';
import { lista_errores } from './interprete/Error/lista_errores';
import { ListaError } from './interprete/Reports/ListaError';
const fs = require('fs');

let archivodot = "";

//creando una clase controlador
class InterpreteController {
    //metodo ping
    public ping(req: Request, res: Response) {
        res.send("Ping interpreter controller OLC1");
    }

    //metodo para interpretar el codigo fuente
    public interpretar(req:Request, res: Response) {
        printlist.splice(0, printlist.length);
        ListaError.splice(0, ListaError.length);
        ListaTabla.splice(0, ListaTabla.length);
        var parser = require("./interprete/interprete");
        const text = req.body.code;
        console.log("Codigo de entrada: " + text);
        try {
            const ast = parser.parse(text);
            const envGlobal = new Environment(null);
            try {
                for(const inst of ast) {
                    if(inst instanceof Funcion) {
                        inst.execute(envGlobal);
                    }
                    if(inst instanceof Expression) {
                        inst.execute(envGlobal);
                    }
                }
            } catch(error) {
                console.log(error);
            }
            try { 
                for(const inst of ast) {
                    if(!(inst instanceof Funcion) && !(inst instanceof Main)) {
                        inst.execute(envGlobal);
                    }
                }

                for(const inst of ast) {
                    if(inst instanceof Main) {
                        inst.execute(envGlobal);
                    }
                }
            } catch(error) {
                console.log(error);
            }

            try {
                let _dot = 'digraph G {\nprincipal[label="AST"];\n';
                for(const inst of ast) {
                   const codigo = inst.getAST();
                   _dot = _dot + `
                   ${codigo.codigorama}\n
                   principal -> ${codigo.nombrenodo};\n`;
                }
                _dot += "}";
                console.log(_dot);
                archivodot += _dot;

                fs.writeFile('./src/controller/interprete/Reportes/arbol.dot', archivodot, function(err:any) {
                    if(err) {
                        throw err;
                    }
                    console.log("Saved!");
                });

                fs.writeFile('C:/Users/rober/OneDrive/Documentos/Github/OLC1_201807169_Proyecto2/Backend/src/controller/interprete/Reportes/arbol.dot', archivodot, function(err:any) {
                    if(err) {
                        throw err;
                    }
                    console.log("hola");
                })

                exec('dot -Tpng "C:/Users/rober/OneDrive/Documentos/Github/OLC1_201807169_Proyecto2/Backend/src/controller/interprete/Reportes/arbol.dot" -o "C:/Users/rober/OneDrive/Documentos/Github/OLC1_201807169_Proyecto2/Frontend/frontend/src/assets/arbol.png"', (err, stdout, stderr) => {
                    if(err) {
                        console.error(`exec error: ${err}`);
                        return;
                    }
                    console.log("se logro compilar la imagen");
                });

            } catch(error) {
                console.log(error);
            }

            let resultado = printlist;
            let errores = lista_errores;
            let mensaje = resultado.join("\n")+"\n"+errores.join("\n");
            res.send({
                consola:mensaje
            })
            printlist.splice(0, printlist.length);
            lista_errores.splice(0, lista_errores.length);
        } catch(err) {
            console.log(err);
            res.json({
                salida:err,
                errores: err
            });
        }
    }

    public ReporteErr(req: Request, res:Response) {
        let err = ListaError;
        let lexico:any[] = [];
        let sintactico:any[] = [];
        for(let i=0; i<err.length; i++) {
            if(err[i].tipo == "Lexico") {
                lexico.push(err[i]);
            }
            else if(err[i].tipo == "Sintactico") {
                sintactico.push(err[i]);
            }
        }

        res.send({
            lexicos:err,
        });
    }

    public ReporteTabla(req:Request, res:Response) { 
        let tabla = ListaTabla;
        res.send({tabla: tabla});
    }
}

export const interpreteController = new InterpreteController();
