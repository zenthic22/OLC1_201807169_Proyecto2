export enum TipoRelacional {
    IGUALACION,
    DIFERENCIACION,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL,
    PARENTESIS,
    CORCHETES
}

export function get_simbolo(objeto: TipoRelacional): string {
    switch(objeto) {
        case 0:
            return "==";
        case 1:
            return "!=";
        case 2:
            return "\\<";
        case 3:
            return "\\<=";
        case 4:
            return "\\>";
        case 5:
            return "\\>=";
        case 6:
            return "()";
        case 7:
            return "[]";
        default:
            return "";
    }
}

export function get_name(objeto: TipoRelacional): string {
    switch(objeto) {
        case 0:
            return "igualacion";
        case 1:
            return "diferencia";
        case 2:
            return "menor";
        case 3:
            return "menorIgual";
        case 4:
            return "mayor";
        case 5:
            return "mayorIgual";
        default:
            return "";
    }
}