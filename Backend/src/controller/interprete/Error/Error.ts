export class Error {
    constructor(
        public tipo: string,
        public descripcion: string,
        public line: number,
        public column: number
    ) {

    }

    public obtener_error() {
        console.log("Tipo: "+this.tipo+" Descripcion: "+this.descripcion+" Linea: "+this.line+" Columna: "+this.column);
    }
}