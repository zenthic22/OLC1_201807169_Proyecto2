/*Definicion Léxica*/
%lex

%options case-insensitive
%x string

%%
[ \r\t]+                                {} //espacios en blanco
\n                                      {} //salto de linea
(\/\/).*                                {} //comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {} //comentario multilinea

//simbolos reservados
"=="                return 'IGUALACION';
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

%{
    const { Type } = require('./abstract/Return');
    const { TipoPrimitivo } = require('./utils/TipoPrimitivo');
    const { TipoAritmetica } = require('./utils/TipoAritmetica');
    const { TipoRelacional } = require('./utils/TipoRelacional');
    const { TipoLogico } = require('./utils/TipoLogico');
    const { Primitivo } = require('./expression/Primitivo');
    const { Print } = require('./instruction/Print');
    const { Declarar } = require('./instruction/Declarar');
    const { DeclararVector } = require('./instruction/DeclararVector');
    const { DeclararLista } = require('./instruction/DeclararLista');
    const { DeclararListaChar } = require('./instruction/DeclararListaChar');
    const { Asignar } = require('./instruction/Asignar');
    const { AsignarVector } = require('./instruction/AsignarVector');
    const { AsignarLista } = require('./instruction/AsignarLista');
    const { AsignarListaChar } = require('./instruction/AsignarListaChar');
    const { ModificarLista } = require('./instruction/ModificarLista');
    const { Acceso } = require('./expression/Acceso');
    const { AccesoVector } = require('./expression/AccesoVector');
    const { AccesoLista } = require('./expression/AccesoLista');
    const { Aritmetica } = require('./expression/Aritmetica');
    const { Relacional } = require('./expression/Relacional');
    const { Logicos } = require('./expression/Logicos');
    const { Casteo } = require('./instruction/Casteo');
    const { IncrementoDecremento } = require('./expression/IncrementoDecremento');
    const { If } = require('./instruction/If');
    const { Statement } = require('./instruction/Statement');
    const { SwitchCase } = require('./instruction/SwitchCase');
    const { Default } = require('./instruction/Default');
    const { Break } = require('./instruction/Break');
    const { While } = require('./instruction/While');
    const { For } = require('./instruction/For');
    const { DoWhile } = require('./instruction/DoWhile');
    const { Continue } = require('./instruction/Continue');
    const { Return } = require('./instruction/Return');
    const { Funcion } = require('./instruction/Funcion');
    const { LlamadaFuncion } = require('./instruction/LlamadaFuncion');
    const { Ternario } = require('./instruction/Ternario');
    const { Length } = require('./instruction/Length');
    const { Round } = require('./instruction/Round');
    const { Typeof } = require('./instruction/Typeof');
    const { Truncate } = require('./instruction/Truncate');
    const { ToString } = require('./instruction/ToString');
    const { ToLower } = require('./instruction/ToLower');
    const { ToUpper } = require('./instruction/ToUpper');
    const { Main } = require('./instruction/Main');
%}

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
            | DECLARARARRAY            { $$ = $1; }
            | DECLARARLISTAS           { $$ = $1; }
            | ASIGNACION               { $$ = $1; }
            | ASIGNACIONARRAY          { $$ = $1; }
            | ASIGNACIONLISTA          { $$ = $1; }
            | MODIFICARLISTAS          { $$ = $1; }
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
            | MAIN LLAMADAFUNCION      { $$ = new Main($2, @1.first_line, @1.first_column); }
            ;

//gramatica para la funcion imprimir
DEFPRINT : RPRINT PARIZQ LISTAEXPRESION PARDER PUNTO_COMA   { $$ = new Print($3, @1.first_line, @1.first_column); }
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
DECLARACION : TIPOS DECLARAVARIOS PUNTO_COMA                    { $$ = new Declarar($1, $2, null, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL EXPRESION PUNTO_COMA    { $$ = new Declarar($1, $2, $4, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL TERNARIO PUNTO_COMA     { $$ = new Declarar($1, $2, $4, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL CASTEO PUNTO_COMA       { $$ = new Declarar($1, $2, $4, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL LLAMADAFUNCION          { $$ = new Declarar($1, $2, $4, @1.first_line, @1.first_column); }
            ;

DECLARARARRAY : TIPOS CORIZQ CORDER DECLARAVARIOS IGUAL NEW TIPOS CORIZQ EXPRESION CORDER PUNTO_COMA      { $$ = new DeclararVector($1, $4, null, @1.first_line, @1.first_column, $9, $7); }
              | TIPOS CORIZQ CORDER DECLARAVARIOS IGUAL LLAVEIZQ LISTAVALORES LLAVEDER PUNTO_COMA         { $$ = new DeclararVector($1, $4, $7, @1.first_line, @1.first_column, null, null); }
              ;

DECLARARLISTAS : LIST MENOR TIPOS MAYOR DECLARAVARIOS IGUAL NEW LIST MENOR TIPOS MAYOR PUNTO_COMA          { $$ = new DeclararLista($3, $5, $10,[],@1.first_line, @1.first_column); }
               | LIST MENOR TIPOS MAYOR DECLARAVARIOS IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PUNTO_COMA { $$ = new DeclararListaChar($3, $5, $9, @1.first_line, @1.first_column); }
               ;

DECLARAVARIOS : DECLARAVARIOS COMA ID       { $1.push($3); $$ = $1; }
              | ID                          { $$ = [$1]; }
              ;

LISTAVALORES : LISTAVALORES COMA EXPRESION  { $1.push($3); $$ = $1; }
             | EXPRESION                    { $$ = [$1]; }
             ;

//gramatica para asignacion de variables ya declaradas
ASIGNACION : ID IGUAL EXPRESION PUNTO_COMA      { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
           | ID IGUAL TERNARIO PUNTO_COMA       { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }   
           | ID IGUAL CASTEO PUNTO_COMA         { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }                                    
           | ID IGUAL LLAMADAFUNCION            { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
           | EXPRESION PUNTO_COMA               {/*aqui no hay nada*/}
           ;

ASIGNACION2 : ID IGUAL EXPRESION          { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
            | ID IGUAL TERNARIO           { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
            | ID IGUAL CASTEO             { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
            ;

ASIGNACIONARRAY : ID CORIZQ EXPRESION CORDER IGUAL EXPRESION PUNTO_COMA { $$ = new AsignarVector($1, $3, $6, @1.first_line, @1.first_column); }
                ;

ASIGNACIONLISTA : ID PUNTO ADD PARIZQ EXPRESION PARDER PUNTO_COMA          { $$ = new AsignarLista($1, $5, @1.first_line, @1.first_column); }
                | ID IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PUNTO_COMA  { $$ = new AsignarListaChar($1, $5, @1.first_line, @1.first_column); }
                ;

MODIFICARLISTAS : ID CORIZQ CORIZQ EXPRESION CORDER CORDER IGUAL EXPRESION PUNTO_COMA  { $$ = new ModificarLista($1, $4, $8, @1.first_line, @1.first_column); }
                ;

//gramatica para casteo de valores o variables
CASTEO : PARIZQ TIPOCASTEO PARDER EXPRESION      { $$ = new Casteo($2, $4, @1.first_line, @1.first_column); }
       ;

TIPOCASTEO : RENTERO        { $$ = 0; }
           | RDOUBLE        { $$ = 1; }
           | RCHAR          { $$ = 3; }
           ;

TIPOS : RENTERO     { $$ = 0; }
      | RDOUBLE     { $$ = 1; }
      | RSTRING     { $$ = 4; }
      | RCHAR       { $$ = 3; }
      | RBOOLEAN    { $$ = 2; }
      ;

//gramatica para la operacion ternaria
TERNARIO : EXPRESION INTERROGACION EXPRESION DOS_PUNTOS EXPRESION  { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column); }     
         ;

//gramatica para la sentencia if
SENTENCIAIF : IF PARIZQ EXPRESION PARDER STATEMENT SENTENCIAELSE   { $$ = new If($3,$5,$6, @1.first_line, @1.first_column); }
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
                ;

LISTACASOS : CASE EXPRESION DOS_PUNTOS CASESTATEMENT                { $$ = []; $$.push([$2, $4]); }
           | LISTACASOS CASE EXPRESION DOS_PUNTOS CASESTATEMENT     { $$ = $1; $$.push([$3, $5]); }
           | DEFAULT DOS_PUNTOS CASESTATEMENT                       { $$.push([new Default(@1.first_line, @1.first_column),$3]); }
           | LISTACASOS DEFAULT DOS_PUNTOS CASESTATEMENT            { $$ = $1; $$.push([new Default(@1.first_line, @1.first_column),$4]); }
           ;

CASESTATEMENT : INSTRUCCIONES       { $$ = new Statement($1, @1.first_line, @1.first_column); }
              |                     { $$ = new Statement([], @1.first_line, @1.first_column); }
              ;

//gramatica para la sentencia while
CICLOWHILE : WHILE PARIZQ EXPRESION PARDER STATEMENT        { $$ = new While($3,$5, @1.first_line, @1.first_column); }
           ;

//gramatica para la sentencia for
SENTENCIAFOR : FOR PARIZQ DECLARACION EXPRESION PUNTO_COMA EXPRESION PARDER STATEMENT       { $$ = new For($3,$4,$6,$8, @1.first_line, @1.first_column); }
             | FOR PARIZQ ASIGNACION EXPRESION PUNTO_COMA EXPRESION PARDER STATEMENT        { $$ = new For($3,$4,$6,$8, @1.first_line, @1.first_column); }
             | FOR PARIZQ DECLARACION EXPRESION PUNTO_COMA ASIGNACION2 PARDER STATEMENT     { $$ = new For($3,$4,$6,$8, @1.first_line, @1.first_column); }
             | FOR PARIZQ ASIGNACION EXPRESION PUNTO_COMA ASIGNACION2 PARDER STATEMENT      { $$ = new For($3,$4,$6,$8, @1.first_line, @1.first_column); }
             ;

//gramatica para la sentencia do-while
SENTENCIADOWHILE : DO STATEMENT WHILE PARIZQ EXPRESION PARDER PUNTO_COMA    { $$ = new DoWhile($5,$2, @1.first_line, @1.first_column); }
                 ;

//gramatica para las funciones
SENTENCIAFUNCION : TIPOS ID PARIZQ PARAMETROS PARDER STATEMENT      { $$ = new Funcion($2,$6,$4,7, @1.first_line, @1.first_column); }
                 | TIPOS ID PARIZQ PARDER STATEMENT                 { $$ = new Funcion($2,$5,[],7, @1.first_line, @1.first_column); }
                 | VOID ID PARIZQ PARAMETROS PARDER STATEMENT       { $$ = new Funcion($2,$6,$4,8, @1.first_line, @1.first_column); }
                 | VOID ID PARIZQ PARDER STATEMENT                  { $$ = new Funcion($2,$5,[],8, @1.first_line, @1.first_column); }
                 ;

PARAMETROS : PARAMETROS COMA TIPOS ID       { $1.push([$3, $4]); $$ = $1; }
           | TIPOS ID                       { $$ = []; $$.push([$1, $2]); }
           ;

//gramatica para la llamada de funciones
LLAMADAFUNCION : ID PARIZQ PARDER PUNTO_COMA                    { $$ = new LlamadaFuncion($1,[], @1.first_line, @1.first_column); }
               | ID PARIZQ LISTAPARAMETROS PARDER PUNTO_COMA    { $$ = new LlamadaFuncion($1,$3, @1.first_line, @1.first_column); }
               ;

LISTAPARAMETROS : LISTAPARAMETROS COMA EXPRESION    { $1.push($3); $$ = $1; }
                | EXPRESION                         { $$ = [$1]; }
                ;

//gramatica para retorno de variables, etc.
RETORNAR : RETURN               { $$ = new Return(@1.first_line, @1.first_column, null); }
         | RETURN EXPRESION     { $$ = new Return(@1.first_line, @1.first_column, $2); }
         ;

//gramatica para las expresiones
EXPRESION : EXPRESION MAS EXPRESION                 { $$ = new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column); }    
          | EXPRESION MENOS EXPRESION               { $$ = new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column); }    
          | EXPRESION POR EXPRESION                 { $$ = new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }    
          | EXPRESION DIVISION EXPRESION            { $$ = new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column); }    
          | EXPRESION POTENCIA EXPRESION            { $$ = new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column); }
          | EXPRESION MODULO EXPRESION              { $$ = new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column); }    
          | MENOS EXPRESION %prec UMENOS            { $$= new Aritmetica($2, new Primitivo(@1.first_line, @1.first_column, "-1", TipoPrimitivo.INT), TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }    

          | EXPRESION IGUALACION EXPRESION          { $$ = new Relacional($1,$3,TipoRelacional.IGUALACION, @1.first_line, @1.first_column); }   
          | EXPRESION DIFERENCIACION EXPRESION      { $$ = new Relacional($1,$3,TipoRelacional.DIFERENCIACION, @1.first_line, @1.first_column); }    
          | EXPRESION MENOR EXPRESION               { $$ = new Relacional($1,$3,TipoRelacional.MENOR, @1.first_line, @1.first_column); }    
          | EXPRESION MAYOR EXPRESION               { $$ = new Relacional($1,$3,TipoRelacional.MAYOR, @1.first_line, @1.first_column); }    
          | EXPRESION MENOR IGUAL EXPRESION         { $$ = new Relacional($1,$4,TipoRelacional.MENORIGUAL, @1.first_line, @1.first_column); }    
          | EXPRESION MAYOR IGUAL EXPRESION         { $$ = new Relacional($1,$4,TipoRelacional.MAYORIGUAL, @1.first_line, @1.first_column); }    

          | EXPRESION AND EXPRESION                 { $$ = new Logicos($1,$3,TipoLogico.AND, @1.first_line, @1.first_column); }    
          | EXPRESION OR EXPRESION                  { $$ = new Logicos($1,$3,TipoLogico.OR, @1.first_line, @1.first_column); }    
          | NOT EXPRESION %prec NOT                 { $$ = new Logicos($2,$2,TipoLogico.NOT, @1.first_line, @1.first_column); }    

          | EXPRESION MAS MAS                           { $$ = new IncrementoDecremento(0,$1, @1.first_line, @1.first_column, $1); }
          | EXPRESION MENOS MENOS                       { $$ = new IncrementoDecremento(1,$1, @1.first_line, @1.first_column, $1); }
             
          | PARIZQ EXPRESION PARDER                     { $$ = $2; }
          | ENTERO                                      { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.INT); }
          | DECIMAL                                     { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.DOUBLE); }
          | CADENA                                      { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.STRING); }
          | CARACTER                                    { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.CHAR); }
          | TRUE                                        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.BOOLEAN); }
          | FALSE                                       { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.BOOLEAN); }

          | ACCEDERVAR                                  { $$ = $1; }
          | ACCEDERARRAY                                { $$ = $1; }
          | ACCEDERLISTA                                { $$ = $1; } 
          | TOLOWER PARIZQ EXPRESION PARDER             { $$ = new ToLower($3, @1.first_line, @1.first_column); }
          | TOUPPER PARIZQ EXPRESION PARDER             { $$ = new ToUpper($3, @1.first_line, @1.first_column); }
          | LENGTH PARIZQ EXPRESION PARDER              { $$ = new Length($3, @1.first_line, @1.first_column); }
          | TRUNCATE PARIZQ EXPRESION PARDER            { $$ = new Truncate($3, @1.first_line, @1.first_column); }
          | ROUND PARIZQ EXPRESION PARDER               { $$ = new Round($3, @1.first_line, @1.first_column); }
          | TYPEOF PARIZQ EXPRESION PARDER              { $$ = new Typeof($3, @1.first_line, @1.first_column); }
          | TOSTRING PARIZQ EXPRESION PARDER            { $$ = new ToString($3, @1.first_line, @1.first_column); }
          ;

ACCEDERVAR : ID { $$ = new Acceso($1, @1.first_line, @1.first_column); }
           ;

ACCEDERARRAY : ID CORIZQ EXPRESION CORDER { $$ = new AccesoVector($1, $3, @1.first_line, @1.first_column); }
             ;

ACCEDERLISTA : ID CORIZQ CORIZQ EXPRESION CORDER CORDER { $$ = new AccesoLista($1, $4, @1.first_line, @1.first_column); }
             ;