import { Request, Response } from "express";
import { join } from "path";
import { exec } from "child_process";

class ApiController {
    public async function1(req: Request, res: Response) {
        console.log("funciona comunicacion");
        try {
            res.json({msg: "Hola Mundo!"});
        } catch (error) {
            res.status(400).send({msg:"Error en funcion"});
        }
    }
}

export const apiController = new ApiController();