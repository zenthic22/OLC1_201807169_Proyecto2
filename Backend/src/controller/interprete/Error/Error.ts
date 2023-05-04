import { lista_errores } from '../Error/lista_errores';
export class Error {
    constructor(
        public line: number,
        public column: number,
        public tipo: string,
        public descripcion: string
    ) {
        var error = "Linea: "+this.line+" Columna: "+this.column+" Tipo: "+this.tipo+" Error: "+this.descripcion;
        lista_errores.push(error);
    }
}