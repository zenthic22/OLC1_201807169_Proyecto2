export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    MENOSUNARIO,
    PARENTESIS,
    CORCHETES
}

export function get_simbolo_op(objeto: TipoAritmetica): string {
    switch(objeto) {
        case 0:
            return "+";
        case 1:
            return "-";
        case 2:
            return "*";
        case 3:
            return "/";
        case 4:
            return "^";
        case 5:
            return "%";
        case 6:
            return "-";
        case 7:
            return "()";
        case 8:
            return "[]";
        default:
            return "";
    }
}

export function get_nombre_op(objeto: TipoAritmetica): string {
    switch(objeto) {
        case 0:
            return "suma";
        case 1:
        case 6:
            return "resta";
        case 2:
            return "multiplicacion";
        case 3:
            return "division";
        case 4:
            return "potencia";
        case 5:
            return "modulo";
        default:
            return ""
    }
}