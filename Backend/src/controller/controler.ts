import { Request, Response } from 'express';
import { Ambito } from './interprete/Mas/Ambito';
import { ListaPrint } from './interprete/Instruccion/ListaPrint';
import { Funcion } from './interprete/Instruccion/Funcion';
import { Main } from './interprete/Instruccion/Main';
import { Print } from './interprete/Instruccion/Print';
import { exec } from 'child_process';
import path from 'path';
import { ListaTabla } from './interprete/Mas/ListaTabla';
let archivodot = "";

class rjpController {
    public helloWorld(req: Request, res: Response) {
        res.send("hola soy yo");
    }

    public interpretar(req: Request, res: Response) {
        ListaTabla.splice(0, ListaTabla.length);
        var parser = require('./interprete/interprete');
        const text = req.body.entrada;
        console.log("texto de entrada: "+text);
        if(text == "") {
            console.log("entrada vacia");
            return null;
        }

        try {
            const ast = parser.parse(text);
            console.log(ast);
            const ambito = new Ambito(null);
            try {
                for(const inst of ast) {
                    if(inst instanceof Funcion) {
                        inst.execute(ambito);
                    }
                }
            } catch(error) {
                console.log(error);
            }
            try {
                for(const inst of ast) {
                    if(!(inst instanceof Funcion) && !(inst instanceof Main) && !(inst instanceof Print)) {
                        const retornar1 = inst.execute(ambito);
                    }
                }
                for(const inst of ast) {
                    if(inst instanceof Main) {
                        const retornar = inst.execute(ambito);
                    }
                }
            } catch(error) {
                console.log(error);
            }

            let resultado = ListaPrint;
            let mensaje = resultado.join("\n")
            res.send({consola: mensaje});
            ListaPrint.splice(0, ListaPrint.length);
        } catch(err) {
            console.log(err);
            res.json({
                salida: err,
                errores: err
            })
        }
    }
}

export const controller = new rjpController();