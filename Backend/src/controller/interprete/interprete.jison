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
    const { TipoAritmetica } = require('./utils/TipoAritmetica');
    const { Primitivo } = require('./expression/Primitivo');
    const { Print } = require('./instruction/Print');
    const { Declarar } = require('./instruction/Declarar');
    const { Asignar } = require('./instruction/Asignar');
    const { Acceso } = require('./expression/Acceso');
    const { Aritmetica } = require('./expression/Aritmetica');
    const { Casteo } = require('./instruction/Casteo');

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
            | ASIGNACION               { $$ = $1; }
            | SENTENCIAIF              { $$ = $1; }
            | SENTENCIASWITCH          { $$ = $1; }
            | CICLOWHILE               { $$ = $1; }
            | SENTENCIAFOR             { $$ = $1; }
            | SENTENCIADOWHILE         { $$ = $1; }
            | SENTENCIAFUNCION         { $$ = $1; }
            | LLAMADAFUNCION           { $$ = $1; }
            | RETORNAR PUNTO_COMA      { $$ = $1; }
            | BREAK PUNTO_COMA         
            | CONTINUE PUNTO_COMA      
            | MAIN LLAMADAFUNCION      
            | error PUNTO_COMA         { console.log('Error sintactico: '+yytext+', en la linea: '+this._$.first_line+', en la columna: '+this._$.first_column); }
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
DECLARACION : TIPOS DECLARAVARIOS PUNTO_COMA                                                                { $$ = new Declarar($1, $2, null, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL EXPRESION PUNTO_COMA                                                { $$ = new Declarar($1, $2, $4, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL TERNARIO PUNTO_COMA                                                 
            | TIPOS DECLARAVARIOS IGUAL CASTEO PUNTO_COMA                                                   { $$ = new Declarar($1, $2, $4, @1.first_line, @1.first_column); }
            | TIPOS DECLARAVARIOS IGUAL LLAMADAFUNCION                                                      
            | TIPOS DECLARAVARIOS CORIZQ CORDER IGUAL NEW TIPOS CORIZQ EXPRESION CORDER PUNTO_COMA          
            | TIPOS DECLARAVARIOS CORIZQ CORDER IGUAL LLAVEIZQ LISTAVALORES LLAVEDER PUNTO_COMA             
            | LIST MENOR TIPOS MAYOR DECLARAVARIOS IGUAL NEW LIST MENOR TIPOS MAYOR PUNTO_COMA              
            | LIST MENOR TIPOS MAYOR DECLARAVARIOS IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PUNTO_COMA     
            ;

DECLARAVARIOS : DECLARAVARIOS COMA ID       { $1.push($3); $$ = $1; }
              | ID                          { $$ = [$1]; }
              ;

LISTAVALORES : LISTAVALORES COMA EXPRESION  { $1.push($3); $$ = $1; }
             | EXPRESION                    { $$ = [$1]; }
             ;

//gramatica para asignacion de variables ya declaradas
ASIGNACION : ID IGUAL EXPRESION PUNTO_COMA                                          { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
           | ID IGUAL TERNARIO PUNTO_COMA                                           
           | ID IGUAL CASTEO PUNTO_COMA                                             { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
           | ID IGUAL LLAMADAFUNCION                                                
           | EXPRESION PUNTO_COMA                                                   {/*aqui no hay nada*/}
           | ID CORIZQ EXPRESION CORDER IGUAL EXPRESION PUNTO_COMA                  
           | ID PUNTO ADD PARIZQ EXPRESION PARDER PUNTO_COMA                        
           | ID CORIZQ CORIZQ EXPRESION CORDER CORDER IGUAL EXPRESION PUNTO_COMA    
           | ID IGUAL TOCHARARRAY PARIZQ EXPRESION PARDER PUNTO_COMA                
           ;

ASIGNACION2 : ID IGUAL EXPRESION          { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
            | ID IGUAL TERNARIO     
            | ID IGUAL CASTEO             { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }
            ;

//gramatica para casteo de valores o variables
CASTEO : PARIZQ TIPOCASTEO PARDER EXPRESION      { $$ = new Casteo($2, $4, @1.first_line, @1.first_column); }
       ;

TIPOCASTEO : RENTERO        { $$ = 0; }
           | RDOUBLE        { $$ = 1; }
           | RCHAR          { $$ = 3; }
           ;

TIPOS : RENTERO     { $$ = Type.INT; }
      | RDOUBLE     { $$ = Type.DOUBLE; }
      | RSTRING     { $$ = Type.STRING; }
      | RCHAR       { $$ = Type.CHAR; }
      | RBOOLEAN    { $$ = Type.BOOLEAN; }
      ;

//gramatica para la operacion ternaria
TERNARIO : EXPRESION INTERROGACION EXPRESION DOS_PUNTOS EXPRESION       
         ;

//gramatica para la sentencia if
SENTENCIAIF : IF PARIZQ EXPRESION PARDER STATEMENT SENTENCIAELSE        
            ;

SENTENCIAELSE : ELSE STATEMENT      { $$ = $2; }
              | ELSE SENTENCIAIF    { $$ = $2; }
              | { $$ = null }
              ;

STATEMENT : LLAVEIZQ INSTRUCCIONES LLAVEDER     
          | LLAVEIZQ LLAVEDER                   
          | error LLAVEDER                      { console.log('Error sintactico: '+yytext+', en la linea: '+this._$.first_line+', en la columna: '+this._$.first_column); }
          ;

//gramatica para la sentencia switch case
SENTENCIASWITCH : SWITCH PARIZQ EXPRESION PARDER LLAVEIZQ LISTACASOS LLAVEDER   
                | error LLAVEDER                                                { console.log('Error sintactico: '+yytext+', en la linea: '+this._$.first_line+', en la columna: '+this._$.first_column); }
                ;

LISTACASOS : CASE EXPRESION DOS_PUNTOS CASESTATEMENT                { $$ = []; $$.push([$2, $4]); }
           | LISTACASOS CASE EXPRESION DOS_PUNTOS CASESTATEMENT     { $$ = $1; $$.push([$3, $5]); }
           | DEFAULT DOS_PUNTOS CASESTATEMENT                       
           | LISTACASOS DEFAULT DOS_PUNTOS CASESTATEMENT            
           ;

CASESTATEMENT : INSTRUCCIONES       
              |                     
              ;

//gramatica para la sentencia while
CICLOWHILE : WHILE PARIZQ EXPRESION PARDER STATEMENT        
           ;

//gramatica para la sentencia for
SENTENCIAFOR : FOR PARIZQ DECLARACION EXPRESION PUNTO_COMA EXPRESION PARDER STATEMENT       
             | FOR PARIZQ ASIGNACION EXPRESION PUNTO_COMA EXPRESION PARDER STATEMENT        
             | FOR PARIZQ DECLARACION EXPRESION PUNTO_COMA ASIGNACION2 PARDER STATEMENT     
             | FOR PARIZQ ASIGNACION EXPRESION PUNTO_COMA ASIGNACION2 PARDER STATEMENT      
             ;

//gramatica para la sentencia do-while
SENTENCIADOWHILE : DO STATEMENT WHILE PARIZQ EXPRESION PARDER PUNTO_COMA    
                 ;

//gramatica para las funciones
SENTENCIAFUNCION : TIPOS ID PARIZQ PARAMETROS PARDER STATEMENT      
                 | TIPOS ID PARIZQ PARDER STATEMENT                 
                 | VOID ID PARIZQ PARAMETROS PARDER STATEMENT       
                 | VOID ID PARIZQ PARDER STATEMENT                  
                 ;

PARAMETROS : PARAMETROS COMA TIPOS ID       { $1.push([$3, $4]); $$ = $1; }
           | TIPOS ID                       { $$ = []; $$.push([$1, $2]); }
           ;

//gramatica para la llamada de funciones
LLAMADAFUNCION : ID PARIZQ PARDER PUNTO_COMA                    
               | ID PARIZQ LISTAPARAMETROS PARDER PUNTO_COMA    
               ;

LISTAPARAMETROS : LISTAPARAMETROS COMA EXPRESION    { $1.push($3); $$ = $1; }
                | EXPRESION                         { $$ = [$1]; }
                ;

//gramatica para retorno de variables, etc.
RETORNAR : RETURN               
         | RETURN EXPRESION     
         ;

//gramatica para las expresiones
EXPRESION : EXPRESION MAS EXPRESION                 { $$ = new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column); }    
          | EXPRESION MENOS EXPRESION               { $$ = new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column); }    
          | EXPRESION POR EXPRESION                 { $$ = new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column); }    
          | EXPRESION DIVISION EXPRESION            { $$ = new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column); }    
          | EXPRESION POTENCIA EXPRESION            { $$ = new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column); }
          | EXPRESION MODULO EXPRESION              { $$ = new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column); }    
          | MENOS EXPRESION %prec UMENOS            { $$= new Aritmetica($2,$2, TipoAritmetica.UMENOS,@1.first_line, @1.first_column); }    

          | EXPRESION IGUALACION EXPRESION              
          | EXPRESION DIFERENCIACION EXPRESION          
          | EXPRESION MENOR EXPRESION                   
          | EXPRESION MAYOR EXPRESION                   
          | EXPRESION MENOR IGUAL EXPRESION             
          | EXPRESION MAYOR IGUAL EXPRESION             

          | EXPRESION AND EXPRESION                     
          | EXPRESION OR EXPRESION                      
          | NOT EXPRESION %prec NOT                     

          | EXPRESION MAS MAS                           
          | EXPRESION MENOS MENOS                       

          | PARIZQ EXPRESION PARDER                     { $$ = $2; }
          | ENTERO                                      { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Type.INT); }
          | DECIMAL                                     { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Type.DOUBLE); }
          | CADENA                                      { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Type.STRING); }
          | CARACTER                                    { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Type.CHAR); }
          | TRUE                                        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Type.BOOLEAN); }
          | FALSE                                       { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Type.BOOLEAN); }

          | ID                                          { $$ = new Acceso($1, @1.first_line, @1.first_column); }
          | ID CORIZQ EXPRESION CORDER                  
          | ID CORIZQ CORIZQ EXPRESION CORDER CORDER    
          
          | TOLOWER PARIZQ EXPRESION PARDER             
          | TOUPPER PARIZQ EXPRESION PARDER             
          | LENGTH PARIZQ EXPRESION PARDER              
          | TRUNCATE PARIZQ EXPRESION PARDER            
          | ROUND PARIZQ EXPRESION PARDER               
          | TYPEOF PARIZQ EXPRESION PARDER              
          | TOSTRING PARIZQ EXPRESION PARDER            
          ;