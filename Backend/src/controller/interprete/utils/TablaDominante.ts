import { Type } from '../abstract/Return'


export const TablaSuma = [
    [Type.INT , Type.DOUBLE , Type.INT , Type.INT , Type.STRING],
    [Type.DOUBLE , Type.DOUBLE , Type.DOUBLE , Type.DOUBLE , Type.STRING],
    [Type.INT , Type.DOUBLE , Type.NULL , Type.NULL , Type.STRING],
    [Type.INT , Type.DOUBLE , Type.NULL , Type.STRING , Type.STRING],
    [Type.STRING , Type.STRING , Type.STRING , Type.STRING , Type.STRING]
]
// tablaSuma[0][0] 
export const TablaResta = [
    [Type.INT , Type.DOUBLE , Type.INT , Type.INT ,  Type.NULL],
    [Type.DOUBLE , Type.DOUBLE , Type.DOUBLE , Type.DOUBLE , Type.NULL],
    [Type.INT , Type.DOUBLE , Type.NULL , Type.NULL , Type.NULL],
    [Type.INT , Type.DOUBLE ,  Type.NULL , Type.NULL , Type.NULL],
    [ Type.NULL , Type.NULL , Type.NULL , Type.NULL , Type.NULL]
]

//tablaMultiplicacion[0][0]
export const TablaPor = [
    [Type.INT, Type.DOUBLE, Type.NULL, Type.INT, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.DOUBLE, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]

//tablaDivision[0][0]
export const TablaDivision = [
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.DOUBLE, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.DOUBLE, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]

//tablaPotencia[0][0]
export const TablaPot = [
    [Type.INT, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]

//tablaModulo[0][0]
export const TablaMod = [
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.DOUBLE, Type.DOUBLE, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL],
    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL]
]