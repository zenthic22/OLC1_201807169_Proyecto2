import { Router } from "express";
import { apiController } from "../controladores/index_control";

class indexroutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        
    }
}

const ndexroutes = new indexroutes();
export default ndexroutes.router;