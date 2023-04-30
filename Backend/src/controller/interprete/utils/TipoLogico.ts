export enum TipoLogico {
    AND,
    OR,
    NOT,
    PARENTESIS,
    CORCHETES
}

export function getSimbol(objeto: TipoLogico):string {
    switch(objeto) {
        case 0:
            return "&&";
        case 1:
            return "\\|\\|";
        case 2:
            return "!";
        case 3:
            return "()";
        case 4:
            return "[]";
    }
    return "";
}

export function get_name(objeto: TipoLogico):string {
    switch(objeto) {
        case 0:
            return "AND";
        case 1:
            return "OR";
        case 2:
            return "NOT";
    }
    return "";
}