import express from 'express';
import { interpreteController } from '../controller/interprete.controller';
const router = express.Router();

//controlador
router.get('/ping', interpreteController.ping);

//interpretar codigo fuente
router.post('/interpretar', interpreteController.interpretar);
router.post('/TablaSimbolos', interpreteController.ReporteTabla);
router.post('/ReporteErrores', interpreteController.ReporteErr);

export default router;