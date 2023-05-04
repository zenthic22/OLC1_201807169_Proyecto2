<script>
    import Component from '../components/Component.vue';
    import Component1 from '../components/Component1.vue';
    import axios from 'axios';
    import 'd3-graphviz'

    export default {
        data() {
          return {
            tabla:[],
            errores:[]
          }
        },

        components: {
          Component,
          Component1
        },

        methods: {
            setTabla(nuevoValor) {
              this.tabla = nuevoValor;
            },

            setErrores(nuevoValor) {
              this.errores = nuevoValor;
            },

            cargarArchivo(event) {
              const archivo = event.target.files[0];
              const lector = new FileReader();
              lector.onload = () => {
                  this.$emit('Component1', lector.result);
              };
              lector.readAsText(archivo);
            },

            enviar() {
              const input = ace.edit("editor");
              var text = input.getValue();
              console.log(text);
              console.log(input);
              axios
                  .post("http://localhost:5000/route/interpretar", {code: text})
                  .then((response) => {
                      let output = ace.edit("salida");
                      output.setValue(response.data["consola"]);
                      console.log(response);
                      
                  })
                  .catch((error) => {
                      throw error;
                  })
            },

            enviar_tabla() {
              axios
                .post("http://localhost:5000/route/TablaSimbolos", {tabla: this.tabla})
                .then(response => {
                    this.setTabla(response.data["tabla"]);
                });
            },

            enviar_errores() {
              axios
                .post("http://localhost:5000/route/ReporteErrores", {lexicos: this.errores})
                .then(response => {
                    this.setErrores(response.data["lexicos"]);
                });
                
            },

            limpiar() {
              const salida = ace.edit("salida");
              axios
                .post("http://localhost:5000/route/reset", {consola: salida})
                .then((response) => {
                  salida.setValue(response.data["consola"]);
                })
            },

            myFunction() {
              var x = document.getElementById("navDemo");
              if(x.className.indexOf("w3-show") == -1) {
                  x.className += "w3-show";
              } else {
                  x.className = x.className.replace(" w3-show","");
              }
            }
        },
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');
  body {
    font-family: "Lato", sans-serif;
  }

  .titulo {
    font-family: 'Bruno Ace', cursive;
    font-size: 52px;
    box-shadow: 0 0 10px rgb(255, 255, 255);
    color: #1ba2d8;
  }

  .sub_title, .sub_title1 {
    font-family: 'Bruno Ace', cursive;
    font-size: 20px;
    color: #c4e386;
  }

  .button-container {
    position: relative;
    width: 200px;
    height: 50px;
  }

  .btn-secondary, .btn-danger {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .btn-primary {
    width: 100%;
    background-color: #000000;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(48, 124, 211, 0.7);
    margin-top: 20px;
    margin-right: 20px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: aqua;
  }

  .btn-secondary {
    width: 100%;
    background-color: #000000;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(48, 124, 211, 0.7);
    margin-top: 20px;
    margin-right: 20px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: aqua;
  }

  .btn-danger {
    width: 100%;
    background-color: #000000;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(197, 255, 39, 0.7);
    margin-top: 20px;
    margin-left: 230px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: #bcb15f;
  }

  .btn-cargar {
    width: 50%;
    background-color: #000000;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(197, 255, 39, 0.7);
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    margin-top: 20px;
    margin-left: 20px;
    color: #bcb15f;
  }

  .btn-info {
    width: 20%;
    background-color: #000000;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(197, 255, 39, 0.7);
    margin-top: 20px;
    margin-left: 405px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: #bcb15f;
  }

  .btn-error {
    width: 20%;
    background-color: #000000;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(48, 124, 211, 0.7);
    margin-top: 20px;
    margin-left: 405px;
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    color: aqua;
  }

  #graph-body {
    border: 2px solid white;
    width: 100%;
    height: 650px;
    padding: 10px;
    margin-left: 10px;
  }

</style>

<template>
  <!--Navbar-->
  <div class="w3-top">
    <div class="w3-bar w3-black w3-card">
      <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
      <a href="#" class="w3-bar-item w3-button w3-padding-large">TYPE WISE</a>
      <a href="#inicio" class="w3-bar-item w3-button w3-padding-large w3-hide-small">Area de Programación</a>
      <div class="w3-dropdown-hover w3-hide-small">
        <button class="w3-padding-large w3-button" title="Reportes">Reportes<i class="fa fa-caret-down"></i></button>
        <div class="w3-dropdown-content w3-bar-block w3-card-4">
          <a href="#AST" class="w3-bar-item w3-button">Árbol AST</a>
          <a href="#Errores" class="w3-bar-item w3-button">Errores Léxicos y Sintácticos</a>
          <a href="#tabla" class="w3-bar-item w3-button">Tabla de Símbolos</a>
        </div>
      </div>
      <div class="w3-dropdown-hover w3-hide-small">
        <button class="w3-padding-large w3-button" title="Documentacion">Documentación<i class="fa fa-caret-down"></i></button>
        <div class="w3-dropdown-content w3-bar-block w3-card-4">
          <a href="#usuario" class="w3-bar-item w3-button">Manual de Usuario</a>
          <a href="#tecnico" class="w3-bar-item w3-button">Manual Técnico</a>
        </div>
      </div>
    </div>
  </div>
  <!--Navbar para darle clic-->
  <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
    <a href="#inicio" class="w3-bar-item w3-button w3-padding-large" v-on:click="myFunction()">Inicio</a>
    <a href="#AST" class="w3-bar-item w3-button w3-padding-large" v-on:click="myFunction()">Árbol AST</a>
    <a href="#Errores" class="w3-bar-item w3-button w3-padding-large" v-on:click="myFunction()">Errores Léxicos y Sintácticos</a>
    <a href="#tabla" class="w3-bar-item w3-button w3-padding-large" v-on:click="myFunction()">Tabla de Símbolos</a>
    <a href="#usuario" class="w3-bar-item w3-button w3-padding-large" v-on:click="myFunction()">Manual de Usuario</a>
    <a href="#tecnico" class="w3-bar-item w3-button w3-padding-large" v-on:click="myFunction()">Manual Técnico</a>
  </div>
  <!--Page content-->
  <div class="w3-content" style="max-width:2000px;margin-top:46px">
    <div class="mySlides w3-display-container w3-center">
      <img src="https://midu.dev/images/wallpapers/una-taza-de-javascript.png" style="width:100%">
      <center>
        <div class="w3-display-topmiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
            <h1 class="titulo">Bienvenido a Type Wise</h1>
            <h2 class="sub_title"><b>Podras realizar la sintaxis de java para poder orientarte acerca del lenguaje</b></h2>
            <h2 class="sub_title1"><b>Sin mas que agregar Empecemos! :D</b></h2>
        </div>
      </center>
    </div>
  </div>
  <!--Seccion de Inicio-->
  <div class="w3-container w3-content w3-center w3-padding-64" style="max-width:800px" id="inicio">
    <h2 class="w3-wide">AREA DE PROGRAMACION</h2>
    <p class="w3-justify">Este es el area en donde podras escribir tu codigo con su respectivo resultado en consola</p>
    <div class="d-flex flex-row" style="margin: 10px; justify-content: center;">
      <label for="cargar_archivo">Nombre del Archivo: </label>
      <input type="file" id="cargar_archivo" name="cargar_archivo" accept=".tw">
      <button class="btn btn-cargar" type="button" @click="cargarArchivo">Cargar el archivo al editor</button>
    </div>
    <div class="w3-row w3-padding-32">
      <div class="w3-third">
        <p>Editor de Código</p>
        <Component/>
        <div class="button-container">
          <button type="button" class="btn btn-secondary" v-on:click="enviar()">Ejecutar</button>
          <button type="button" class="btn btn-danger" v-on:click="limpiar()">Limpiar</button>
        </div>
      </div>
    </div>
    <div class="w3-third">
        <p>Consola de Salida</p>
        <Component1/>
    </div>
  </div>
  <!--Seccion de Reportes-->
  <div class="w3-black" id="AST">
    <div class="w3-container w3-content w3-padding-64" style="max-width:1050px">
      <h2 class="w3-wide w3-center">AREA DE REPORTES</h2>
      <p class="w3-opacity w3-center"><i>Aqui puedes ver los reportes, tales como: la tabla de simbolos que ingresaste a tu programa, el grafo de los tokens y los errores de sintaxis en el código</i></p>
      <div class="w3-row-padding w3-padding-32" style="margin:0 -16px">
        <p class="w3-opacity w3-center"><b>ERRORES LEXICOS Y SINTACTICOS</b></p>
          <center>
            <table class="table table-dark" style="text-align: center;">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tipo de Error</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Línea</th>
                  <th scope="col">Columna</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(errores, index) in errores" :key="index">
                  <th scope="row">{index+1}</th>
                  <td>{{ errores.tipo }}</td>
                  <td>{{ errores.descripcion }}</td>
                  <td>{{ errores.line }}</td>
                  <td>{{ errores.column }}</td>
                </tr>
              </tbody>
            </table>
          </center>
      </div>
      <button type="button" class="btn btn-error" v-on:click="enviar_errores()">Reporte de Errores</button>
      <div class="w3-row-padding w3-padding-32" style="margin:0 -16px">
        <p class="w3-opacity w3-center"><b>TABLA DE SIMBOLOS</b></p>
        <center>
          <table class="table table-dark" style="text-align: center;">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Identificador</th>
                <th scope="col">Tipo 1</th>
                <th scope="col">Tipo 2</th>
                <th scope="col">Entorno</th>
                <th scope="col">Linea</th>
                <th scope="col">Columna</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tabla, index) in tabla" :key="index">
                <th scope="row">{index+1}</th>
                <td>{{ tabla.id }}</td>
                <td>{{ tabla.tipo1 }}</td>
                <td>{{ tabla.tipo2 }}</td>
                <td>{{ tabla.ambito }}</td>
                <td>{{ tabla.linea }}</td>
                <td>{{ tabla.columna }}</td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
      <button type="button" class="btn btn-info" v-on:click="enviar_tabla()">Tabla de Simbolos</button>
      <div class="w3-row-padding w3-padding-32" style="margin:0 -16px">
        <p class="w3-opacity w3-center"><b>ARBOL AST</b></p>
        <img src="../assets/arbol.png">
      </div>
    </div>
  </div>
  <!--Seccion de Documentacion-->
  <div class="w3-container w3-content w3-padding-64" style="max-width:800px" id="usuario">
    <h2 class="w3-wide w3-center">DOCUMENTACION</h2>
    <p class="w3-opacity w3-center">Para una guia rapida te recomiendo que lo leas detenidamente</p>
    <div class="w3-row w3-padding-32">
      <div class="w3-col m6 w3-large w3-margin-bottom">
        <i class="fa fa-map-marker" style="width:30px"></i><a href="#usuario">Manual de Usuario</a><br>
        <i class="fa fa-map-marker" style="width:30px"></i><a href="#tecnico">Manual Tecnico</a>
      </div>
    </div>
  </div>
</template>