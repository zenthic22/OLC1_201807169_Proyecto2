export enum Type {
    ENTERO = 0,
    CADENA  = 1,
    BOOLEANO = 2,
    DOUBLE = 3,
    CARACTER = 4,
    VECTOR =5,
    LISTA =6
}

export type Retorno = {
    value: any,
    type: Type,
    tamanio?: number,
    edd?: Type
}

//tabla de tipo dominante para operaciones aritmeticas
// TABLA DOMINATE PARA LA SUMA 
export const tipos_suma = [
    [   Type.ENTERO, Type.ENTERO, Type.ENTERO   ],
    [   Type.ENTERO, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.ENTERO, Type.BOOLEANO, Type.ENTERO   ],
    [   Type.ENTERO, Type.CARACTER, Type.ENTERO   ],
    [   Type.ENTERO, Type.CADENA, Type.CADENA   ],

    [   Type.DOUBLE, Type.ENTERO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.BOOLEANO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CARACTER, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CADENA, Type.CADENA   ],

    [   Type.BOOLEANO, Type.ENTERO, Type.ENTERO   ],
    [   Type.BOOLEANO, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.BOOLEANO, Type.CADENA, Type.CADENA  ],

    [   Type.CARACTER, Type.ENTERO, Type.ENTERO   ],
    [   Type.CARACTER, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.CARACTER, Type.CARACTER, Type.CADENA   ],
    [   Type.CARACTER, Type.CADENA, Type.CADENA   ],

    [   Type.CADENA, Type.ENTERO, Type.CADENA   ],
    [   Type.CADENA, Type.DOUBLE, Type.CADENA   ],
    [   Type.CADENA, Type.BOOLEANO, Type.CADENA   ],
    [   Type.CADENA, Type.CADENA, Type.CADENA   ],
    [   Type.CADENA, Type.CARACTER, Type.CADENA   ]
];

// TABLA DOMINATE PARA LA RESTA 
export const tipos_resta = [
    [   Type.ENTERO, Type.ENTERO, Type.ENTERO   ],
    [   Type.ENTERO, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.ENTERO, Type.BOOLEANO, Type.ENTERO   ],
    [   Type.ENTERO, Type.CARACTER, Type.ENTERO   ],

    [   Type.DOUBLE, Type.ENTERO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.BOOLEANO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CARACTER, Type.DOUBLE   ],

    [   Type.BOOLEANO, Type.ENTERO, Type.ENTERO   ],
    [   Type.BOOLEANO, Type.DOUBLE, Type.DOUBLE   ],

    [   Type.CARACTER, Type.ENTERO, Type.ENTERO   ],
    [   Type.CARACTER, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA MULTIPLICACION
export const tipos_multiplicacion = [
    [   Type.ENTERO, Type.ENTERO, Type.ENTERO   ],
    [   Type.ENTERO, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.ENTERO, Type.CARACTER, Type.ENTERO   ],

    [   Type.DOUBLE, Type.ENTERO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CARACTER, Type.DOUBLE   ],

    [   Type.CARACTER, Type.ENTERO, Type.ENTERO   ],
    [   Type.CARACTER, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA DIVISION
export const tipos_division = [
    [   Type.ENTERO, Type.ENTERO, Type.DOUBLE  ],
    [   Type.ENTERO, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.ENTERO, Type.CARACTER, Type.DOUBLE   ],

    [   Type.DOUBLE, Type.ENTERO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CARACTER, Type.DOUBLE   ],

    [   Type.CARACTER, Type.ENTERO, Type.DOUBLE   ],
    [   Type.CARACTER, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA POTENCIA
export const tipos_potencia = [
    [   Type.ENTERO, Type.ENTERO, Type.ENTERO   ],
    [   Type.ENTERO, Type.DOUBLE, Type.DOUBLE   ],

    [   Type.DOUBLE, Type.ENTERO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA MODULO
export const tipos_modulo = [
    [   Type.ENTERO, Type.ENTERO, Type.ENTERO   ],
    [   Type.ENTERO, Type.DOUBLE, Type.DOUBLE   ],

    [   Type.DOUBLE, Type.ENTERO, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ]
];