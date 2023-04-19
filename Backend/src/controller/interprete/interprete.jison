%{
    const {Primitivo,TipoPrimitivo} = require('./Expresion/Primitivo');
    const {Aritmetica, TipoAritmetica} = require('./Expresion/Aritmetica');
    const {Relacional,TipoRelacional} = require('./Expresion/Relacional');
    const {Logicos,TipoLogico} = require('./Expresion/Logicos');
    const {Declarar} = require('./Instruccion/Declarar');
    const {DeclararVector} = require('./Instruccion/DeclararVector');
    const {DeclararLista} = require('./Instruccion/DeclararLista');
    const {Asignar} = require('./Instruccion/Asignar');
    const {AsignarVector} = require('./Instruccion/AsignarVector');
    const {AsignarLista} = require('./Instruccion/AsignarLista');
    const {Ternario} = require('./Instruccion/Ternario');
    const {Acceso} = require('./Expresion/Acceso');
    const {AccesoVector} = require('./Expresion/AccesoVector');
    const {AccesoLista} = require('./Expresion/AccesoLista');
    const {Casteo} = require('./Instruccion/Casteo');
    const {IncrementoDecremento} = require('./Expresion/IncrementoDecremento');
    const {ModificarLista} = require('./Instruccion/ModificarLista');

    const {Print} = require('./Instruccion/Print');
    const {ToLower} = require('./Instruccion/ToLower');
    const {ToUpper} = require('./Instruccion/ToUpper');
    const {Length} = require('./Instruccion/Length');
    const {Break} = require('./Instruccion/Break');
    const {Continue} = require('./Instruccion/Continue');
    const {Return} = require('./Instruccion/Return');
    const {Truncate} = require('./Instruccion/Truncate');
    const {Round} = require('./Instruccion/Round');
    const {Typeof} = require('./Instruccion/Typeof');
    const {Tostring} = require('./Instruccion/Tostring');
    const {DeclararListaChar} = require('./Instruccion/DeclararListaChar');
    const {AsignarListaChar} = require('./Instruccion/AsignarListaChar');

    const {If} = require('./Instruccion/If');
    const {Statement} = require('./Instruccion/Statement');
    const {SwitchCase} = require('./Instruccion/SwitchCase');
    const {Default} = require('./Instruccion/Default');
    const {While} = require('./Instruccion/While');
    const {DoWhile} = require('./Instruccion/DoWhile');
    const {For} = require('./Instruccion/For');

    const {Funcion} = require('./Instruccion/Funcion');
    const {LlamadaFuncion} = require('./Instruccion/LlamadaFuncion');
    const {Main} = require('./Instruccion/Main');

%}

/*Definicion Léxica*/
%lex

%options case-insensitive
%x string

%%

//simbolos reservados
";"                 return 'PUNTO_COMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"."                 return 'PUNTO';
":"                 return 'DOS_PUNTOS';
","                 return 'COMA';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';
"{"                 return 'LLAVEIZQ';
"}"                 return 'LLAVEDER';
"?"                 return 'INTERROGACION';
"="                 return 'IGUAL';

//palabras reservadas del lenguaje
"print"             return 'RPRINT';
"true"              return 'TRUE';
"false"             return 'FALSE';
"new"               return 'NEW';
"list"              return 'LIST';
"add"               return 'ADD';
"tolower"           return 'TOLOWER';
"toupper"           return 'TOUPPER';
"length"            return 'LENGTH';
"if"                return 'IF';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"break"             return 'BREAK';
"default"           return 'DEFAULT';
"while"             return 'WHILE';
"for"               return 'FOR';
"do"                return 'DO';
"void"              return 'VOID';
"continue"          return 'CONTINUE';
"return"            return 'RETURN';
"truncate"          return 'TRUNCATE';
"round"             return 'ROUND';
"typeof"            return 'TYPEOF';
"tostring"          return 'TOSTRING';
"tochararray"       return 'TOCHARARRAY';
"main"              return 'MAIN';

//simbolos aritmeticos
"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVISION';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';

//simbolos relacionales
"=="                return 'IGUALACION';
"!="                return 'DIFERENCIACION';
"<"                 return 'MENOR';
"<="                return 'MENORIGUAL';
">"                 return 'MAYOR';                 
">="                return 'MAYORIGUAL';

//simbolos logicos
"&&"                return 'AND';
"||"                return 'OR';
"!"                 return 'NOT';

//tipos de variables
"int"               return 'RENTERO';
"string"            return 'RSTRING';
"char"              return 'RCHAR';
"boolean"           return 'RBOOLEAN';
"double"            return 'RDOUBLE';

//expresiones regulares
[ \r\t]+                                {} //espacios en blanco
\n                                      {} //salto de linea
(\/\/).*                                {} //comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {} //comentario multilinea

[a-zA-Z][a-zA-Z0-9_]*                   return 'ID';
[0-9]+("."[0-9]+)\b                     return 'DECIMAL';
[0-9]+\b                                return 'ENTERO';
\'((\\\')|[^\n\'])*\'                   { yytext = yytext.substr(1, yyleng-2); return 'CARACTER'; }
["]                                     { cadena = ""; this.begin("string"); }
<string>[^"\\]+                         { cadena += yytext; }
<string>"\\\""                          { cadena += "\""; }
<string>"\\n"                           { cadena += "\n"; }
<string>"\\t"                           { cadena += "\t"; }
<string>"\\\\"                          { cadena += "\\"; }
<string>"\\\'"                          { cadena += "\'"; }
<string>["]                             { yytext = cadena; this.popState(); return 'CADENA'; }

<<EOF>>                                 return 'EOF';

.                                       { console.log('Error lexico: '+yytext+', en la linea: '+yylloc.first_line+', en la columna: '+yylloc.first_column); }

/lex

//precedencia de operadores
%left 'OR'
%left 'AND'
%right 'FCAST'
%left 'IGUALACION' 'DIFERENCIACION'
%left 'MENOR' 'MAYOR' 'MAYORIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVISION' 'MODULO'
%left 'POTENCIA'
%right 'UMENOS' 'NOT'

%start INICIO

%%

//gramatica del programa
INICIO : INSTRUCCIONES EOF { return $1; }
       ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   { $1.push($2); $$ = $1; }
              | INSTRUCCION                 { $$ = [$1]; }
              ;

INSTRUCCION : DEFPRINT                 { $$ = $1; }
            | DECLARACION              { $$ = $1; }
            | ASIGNACION               { $$ = $1; }
            | SENTENCIAIF              { $$ = $1; }
            | SENTENCIASWITCH          { $$ = $1; }
            | CICLOWHILE               { $$ = $1; }
            | SENTENCIAFOR             { $$ = $1; }
            | SENTENCIADOWHILE         { $$ = $1; }
            | SENTENCIAFUNCION         { $$ = $1; }
            | LLAMADAFUNCION           { $$ = $1; }
            | RETORNAR PUNTO_COMA      { $$ = $1; }
            | BREAK PUNTO_COMA         { $$ = new Break(@1.first_line, @1.first_column); }
            | CONTINUE PUNTO_COMA      { $$ = new Continue(@1.first_line, @1.first_column); }
            | MAIN LLAMADAFUNCION      { $$ = new Main($3,@1.first_line, @1.first_column); }
            | error PUNTO_COMA         { console.log('Error sintactico: '+yytext+', en la linea: '+this._$.first_line+', en la columna: '+this._$.first_column); }
            ;

//gramatica para la funcion imprimir
DEFPRINT : RPRINT PARIZQ LISTAEXPRESION PARDER PUNTO_COMA   { $$ = new Print($3,@1.first_line, @1.first_column); }
         ;

LISTAEXPRESION : LISTAEXPRESION COMA EXPRESION      { $1.push($3); $$ = $1; }
               | EXPRESION                          { $$ = [$1]; }
               ;

//gramatica para la declaracion de variables
/*
- declaracion de variables con asignacion y sin asignacion
- incluye el casteo de variables
- declaracion de listas, vectores
*/
DECLARACION : TIPOS DECLARAVARIOS PUNTO_COMA                                                                { $$ = new Declarar($1,$2,null,@1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL EXPRESION PUNTO_COMA                                                { $$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL TERNARIO PUNTO_COMA                                                 { $$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL CASTEO PUNTO_COMA                                                   { $$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL LLAMADAFUNCION                                                      { $$ = new Declarar($1,$2,$4,@1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS CORIZQ CORDER IGUAL NEW TIPOS CORIZQ EXPRESION CORDER PUNTO_COMA          { $$ = new DeclararVector($1,$2,null,@1.first_line, @1.first_column,$9,$7); }
            | TIPOS DECLARAVARIOS CORIZQ CORDER IGUAL LLAVEIZQ LISTAVALORES LLAVEDER PUNTO_COMA             { $$ = new DeclararVector($1,$2,$7,@1.first_line, @1.first_column,null,null); }
            | LIST MENOR TIPOS MAYOR DECLARAVARIOS IGUAL NEW LIST MENOR TIPOS MAYOR PUNTO_COMA              { $$ = new DeclararLista($3,$5,$10,[],@1.first_line, @1.first_column); }
            | LIST MENOR TIPOS MAYOR DECLARAVARIOS IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PUNTO_COMA     { $$ = new DeclararListaChar($3,$5,$9,@1.first_line, @1.first_column); }
            ;

DECLARAVARIOS : DECLARAVARIOS COMA ID       { $1.push($3); $$ = $1; }
              | ID                          { $$ = [$1]; }
              ;

LISTAVALORES : LISTAVALORES COMA EXPRESION  { $1.push($3); $$ = $1; }
             | EXPRESION                    { $$ = [$1]; }
             ;

//gramatica para asignacion de variables ya declaradas
ASIGNACION : ID IGUAL EXPRESION PUNTO_COMA                                          { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
           | ID IGUAL TERNARIO PUNTO_COMA                                           { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
           | ID IGUAL CASTEO PUNTO_COMA                                             { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
           | ID IGUAL LLAMADAFUNCION                                                { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
           | EXPRESION PUNTO_COMA                                                   {/*aqui no hay nada*/}
           | ID CORIZQ EXPRESION CORDER IGUAL EXPRESION PUNTO_COMA                  { $$ = new AsignarVector($1,$3,$6,@1.first_line, @1.first_column); }
           | ID PUNTO ADD PARIZQ EXPRESION PARDER PUNTO_COMA                        { $$ = new AsignarLista($3,$5,@1.first_line, @1.first_column); }
           | ID CORIZQ CORIZQ EXPRESION CORDER CORDER IGUAL EXPRESION PUNTO_COMA    { $$ = new ModificarLista($1,$4,$8,@1.first_line, @1.first_column); }
           | ID IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PUNTO_COMA                { $$ = new AsignarListaChar($1,$5,@1.first_line, @1.first_column); }
           ;

ASIGNACION2 : ID IGUAL EXPRESION    { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
            | ID IGUAL TERNARIO     { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
            | ID IGUAL CASTEO       { $$ = new Asignar($1,$3,@1.first_line, @1.first_column); }
            ;

//gramatica para casteo de valores o variables
CASTEO : PARIZQ TIPOCASTEO PARDER EXPRESION     { $$ = new Casteo($2,$4,@1.first_line, @1.first_column,null); }
       ;

TIPOCASTEO : RENTERO        { $$ = 0; }
           | RDOUBLE        { $$ = 3; }
           | RCHAR          { $$ = 4; }
           ;

TIPOS : RENTERO     { $$ = 0; }
      | RSTRING     { $$ = 1; }
      | RDOUBLE     { $$ = 3; }
      | RCHAR       { $$ = 4; }
      | RBOOLEAN    { $$ = 2; }
      ;

//gramatica para la operacion ternaria
TERNARIO : EXPRESION INTERROGACION EXPRESION DOS_PUNTOS EXPRESION       { $$ = new Ternario($1,$3,$5,@1.first_line, @1.first_column); }
         ;

//gramatica para la sentencia if
SENTENCIAIF : IF PARIZQ EXPRESION PARDER STATEMENT SENTENCIAELSE        { $$ = new If($3, $5, $6, @1.first_line, @1.first_column); }
            ;

SENTENCIAELSE : ELSE STATEMENT      { $$ = $2; }
              | ELSE SENTENCIAIF    { $$ = $2; }
              | { $$ = null }
              ;

STATEMENT : LLAVEIZQ INSTRUCCIONES LLAVEDER     { $$ = new Statement($2, @1.first_line, @1.first_column); }
          | LLAVEIZQ LLAVEDER                   { $$ = new Statement([], @1.first_line, @1.first_column); }
          | error LLAVEDER                      { console.log('Error sintactico: '+yytext+', en la linea: '+this._$.first_line+', en la columna: '+this._$.first_column); }
          ;

//gramatica para la sentencia switch case
SENTENCIASWITCH : SWITCH PARIZQ EXPRESION PARDER LLAVEIZQ LISTACASOS LLAVEDER   { $$ = new SwitchCase($3,$6,@1.first_line, @1.first_column); }
                | error LLAVEDER                                                { console.log('Error sintactico: '+yytext+', en la linea: '+this._$.first_line+', en la columna: '+this._$.first_column); }
                ;

LISTACASOS : CASE EXPRESION DOS_PUNTOS CASESTATEMENT                { $$ = []; $$.push([$2, $4]); }
           | LISTACASOS CASE EXPRESION DOS_PUNTOS CASESTATEMENT     { $$ = $1; $$.push([$3, $5]); }
           | DEFAULT DOS_PUNTOS CASESTATEMENT                       { $$ = new Default(@1.first_line, @1.first_column),$3]); }
           | LISTACASOS DEFAULT DOS_PUNTOS CASESTATEMENT            { $$ = new Default(@1.first_line, @1.first_column),$4]); }
           ;

CASESTATEMENT : INSTRUCCIONES       { $$ = new Statement($1, @1.first_line, @1.first_column); }
              |                     { $$ = new Statement([], @1.first_line, @1.first_column); }
              ;

//gramatica para la sentencia while
CICLOWHILE : WHILE PARIZQ EXPRESION PARDER STATEMENT        { $$ = new While($3, $5,  @1.first_line, @1.first_column); }
           ;

//gramatica para la sentencia for
SENTENCIAFOR : FOR PARIZQ DECLARACION EXPRESION PUNTO_COMA EXPRESION PARDER STATEMENT       { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column); }
             | FOR PARIZQ ASIGNACION EXPRESION PUNTO_COMA EXPRESION PARDER STATEMENT        { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column); }
             | FOR PARIZQ DECLARACION EXPRESION PUNTO_COMA ASIGNACION2 PARDER STATEMENT     { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column); }
             | FOR PARIZQ ASIGNACION EXPRESION PUNTO_COMA ASIGNACION2 PARDER STATEMENT      { $$ = new For($3, $4,$6,$8, @1.first_line,@1.first_column); }
             ;

//gramatica para la sentencia do-while
SENTENCIADOWHILE : DO STATEMENT WHILE PARIZQ EXPRESION PARDER PUNTO_COMA    { $$ = new DoWhile($5, $2,  @1.first_line, @1.first_column); }
                 ;

//gramatica para las funciones
SENTENCIAFUNCION : TIPOS ID PARIZQ PARAMETROS PARDER STATEMENT      { $$ = new Funcion($2, $6,$4,7, @1.first_line, @1.first_column,$1); }
                 | TIPOS ID PARIZQ PARDER STATEMENT                 { $$ = new Funcion($2, $5,[],7, @1.first_line, @1.first_column,$1); }
                 | VOID ID PARIZQ PARAMETROS PARDER STATEMENT       { $$ = new Funcion($2, $6,$4,8, @1.first_line, @1.first_column,nul); }
                 | VOID ID PARIZQ PARDER STATEMENT                  { $$ = new Funcion($2, $5,[],8, @1.first_line, @1.first_column,null); }
                 ;

PARAMETROS : PARAMETROS COMA TIPOS ID       { $1.push([$3, $4]); $$ = $1; }
           | TIPOS ID                       { $$ = []; $$.push([$1, $2]); }
           ;

//gramatica para la llamada de funciones
LLAMADAFUNCION : ID PARIZQ PARDER PUNTO_COMA                    { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column); }
               | ID PARIZQ LISTAPARAMETROS PARDER PUNTO_COMA    { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column); }
               ;

LISTAPARAMETROS : LISTAPARAMETROS COMA EXPRESION    { $1.push($3); $$ = $1; }
                | EXPRESION                         { $$ = [$1]; }
                ;

//gramatica para retorno de variables, etc.
RETORNAR : RETURN               { $$ = new Return(@1.first_line, @1.first_column,null); }
         | RETURN EXPRESION     { $$ = new Return(@1.first_line, @1.first_column,$2); }
         ;

//gramatica para las expresiones
EXPRESION : EXPRESION MAS EXPRESION                     { $$ = new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column); }
          | EXPRESION MENOS EXPRESION                   { $$ = new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column); }
          | EXPRESION POR EXPRESION                     { $$ = new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }
          | EXPRESION DIVISION EXPRESION                { $$ = new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column); }
          | EXPRESION POTENCIA EXPRESION                { $$ = new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column); }
          | EXPRESION MODULO EXPRESION                  { $$ = new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column); }
          | MENOS EXPRESION %prec UMENOS                { $$ = new Aritmetica($2,new Primitivo("-1",TipoPrimitivo.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }

          | EXPRESION IGUALACION EXPRESION              { $$ = new Relacional($1,$3,TipoRelacional.IGUALIGUALACION, @1.first_line, @1.first_column); }
          | EXPRESION DIFERENCIACION EXPRESION          { $$ = new Relacional($1,$3,TipoRelacional.DIFERENCIACION, @1.first_line, @1.first_column); }
          | EXPRESION MENOR EXPRESION                   { $$ = new Relacional($1,$3,TipoRelacional.MENORQUE, @1.first_line, @1.first_column); }
          | EXPRESION MAYOR EXPRESION                   { $$ = new Relacional($1,$3,TipoRelacional.MAYORQUE, @1.first_line, @1.first_column); }
          | EXPRESION MENOR IGUAL EXPRESION             { $$ = new Relacional($1,$4,TipoRelacional.MENORIGUAL, @1.first_line, @1.first_column); }
          | EXPRESION MAYOR IGUAL EXPRESION             { $$ = new Relacional($1,$4,TipoRelacional.MAYORIGUAL, @1.first_line, @1.first_column); }

          | EXPRESION AND EXPRESION                     { $$ = new Logicos($1,$3, TipoLogico.AND, @1.first_line, @1.first_column); }
          | EXPRESION OR EXPRESION                      { $$ = new Logicos($1,$3,TipoLogico.OR, @1.first_line, @1.first_column); }
          | NOT EXPRESION %prec NOT                     { $$ = new Logicos($2,$2, TipoLogico.NOT, @1.first_line, @1.first_column); }

          | EXPRESION MAS MAS                           { $$ = new IncrementoDecremento(0,$1, @1.first_line, @1.first_column,$1); }
          | EXPRESION MENOS MENOS                       { $$ = new IncrementoDecremento(1,$1, @1.first_line, @1.first_column,$1); }

          | PARIZQ EXPRESION PARDER                     { $$ = $2; }
          | ENTERO                                      { $$ = new Primitivo($1,TipoPrimitivo.ENTERO, @1.first_line, @1.first_column); }
          | DECIMAL                                     { $$ = new Primitivo($1,TipoPrimitivo.DOUBLE, @1.first_line, @1.first_column); }
          | CADENA                                      { $$ = new Primitivo($1,TipoPrimitivo.CADENA, @1.first_line, @1.first_column); }
          | CARACTER                                    { $$ = new Primitivo($1,TipoPrimitivo.CARACTER, @1.first_line, @1.first_column); }
          | TRUE                                        { $$ = new Primitivo($1,TipoPrimitivo.BOOLEANO, @1.first_line, @1.first_column); }
          | FALSE                                       { $$ = new Primitivo($1,TipoPrimitivo.BOOLEANO, @1.first_line, @1.first_column); }

          | ID                                          { $$ = new Acceso($1, @1.first_line, @1.first_column); }
          | ID CORIZQ EXPRESION CORDER                  { $$ = new AccesoVector($1,$3, @1.first_line, @1.first_column); }
          | ID CORIZQ CORIZQ EXPRESION CORDER CORDER    { $$ = new AccesoLista($3,$5,@1.first_line, @1.first_column); }
          
          | TOLOWER PARIZQ EXPRESION PARDER             { $$ = new ToLower($3,@1.first_line, @1.first_column); }
          | TOUPPER PARIZQ EXPRESION PARDER             { $$ = new ToUpper($3,@1.first_line, @1.first_column); }
          | LENGTH PARIZQ EXPRESION PARDER              { $$ = new Length($3,@1.first_line, @1.first_column); }
          | TRUNCATE PARIZQ EXPRESION PARDER            { $$ = new Truncate($3,@1.first_line, @1.first_column); }
          | ROUND PARIZQ EXPRESION PARDER               { $$ = new Round($3,@1.first_line, @1.first_column); }
          | TYPEOF PARIZQ EXPRESION PARDER              { $$ = new Typeof($3,@1.first_line, @1.first_column); }
          | TOSTRING PARIZQ EXPRESION PARDER            { $$ = new Tostring($3,@1.first_line, @1.first_column); }
          ;