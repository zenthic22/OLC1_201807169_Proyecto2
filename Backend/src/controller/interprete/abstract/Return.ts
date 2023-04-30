export enum Type {
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4,
    NULL = 5,
    VECTOR = 6,
    LISTA = 7
}

export type Return = {
    value: any,
    type: Type,
    tamanio?:number,
    edd?:Type
}

export const tipos_suma = [
    [   Type.INT, Type.INT, Type.INT   ],
    [   Type.INT, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.INT, Type.BOOLEAN, Type.INT   ],
    [   Type.INT, Type.CHAR, Type.INT   ],
    [   Type.INT, Type.STRING, Type.STRING   ],

    [   Type.DOUBLE, Type.INT, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.BOOLEAN, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CHAR, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.STRING, Type.STRING   ],

    [   Type.BOOLEAN, Type.INT, Type.INT   ],
    [   Type.BOOLEAN, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.BOOLEAN, Type.STRING, Type.STRING  ],

    [   Type.CHAR, Type.INT, Type.INT   ],
    [   Type.CHAR, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.CHAR, Type.CHAR, Type.STRING   ],
    [   Type.CHAR, Type.STRING, Type.STRING   ],

    [   Type.STRING, Type.INT, Type.STRING   ],
    [   Type.STRING, Type.DOUBLE, Type.STRING   ],
    [   Type.STRING, Type.BOOLEAN, Type.STRING   ],
    [   Type.STRING, Type.STRING, Type.STRING   ],
    [   Type.STRING, Type.CHAR, Type.STRING   ]
];

// TABLA DOMINATE PARA LA RESTA 
export const tipos_resta = [
    [   Type.INT, Type.INT, Type.INT   ],
    [   Type.INT, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.INT, Type.BOOLEAN, Type.INT   ],
    [   Type.INT, Type.CHAR, Type.INT   ],

    [   Type.DOUBLE, Type.INT, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.BOOLEAN, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CHAR, Type.DOUBLE   ],

    [   Type.BOOLEAN, Type.INT, Type.INT   ],
    [   Type.BOOLEAN, Type.DOUBLE, Type.DOUBLE   ],

    [   Type.CHAR, Type.INT, Type.INT   ],
    [   Type.CHAR, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA MULTIPLICACION
export const tipos_multiplicacion = [
    [   Type.INT, Type.INT, Type.INT   ],
    [   Type.INT, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.INT, Type.CHAR, Type.INT   ],

    [   Type.DOUBLE, Type.INT, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CHAR, Type.DOUBLE   ],

    [   Type.CHAR, Type.INT, Type.INT   ],
    [   Type.CHAR, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA DIVISION
export const tipos_division = [
    [   Type.INT, Type.INT, Type.DOUBLE  ],
    [   Type.INT, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.INT, Type.CHAR, Type.DOUBLE   ],

    [   Type.DOUBLE, Type.INT, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.CHAR, Type.DOUBLE   ],

    [   Type.CHAR, Type.INT, Type.DOUBLE   ],
    [   Type.CHAR, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA POTENCIA
export const tipos_potencia = [
    [   Type.INT, Type.INT, Type.INT   ],
    [   Type.INT, Type.DOUBLE, Type.DOUBLE   ],

    [   Type.DOUBLE, Type.INT, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ]
];

// TABLA DOMINATE PARA LA MODULO
export const tipos_modulo = [
    [   Type.INT, Type.INT, Type.INT   ],
    [   Type.INT, Type.DOUBLE, Type.DOUBLE   ],

    [   Type.DOUBLE, Type.INT, Type.DOUBLE   ],
    [   Type.DOUBLE, Type.DOUBLE, Type.DOUBLE   ]
];