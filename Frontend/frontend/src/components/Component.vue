<script>
    import 'ace-builds/src-noconflict/ace';
    import 'ace-builds/src-noconflict/mode-java';
    import 'ace-builds/src-noconflict/theme-dracula';
    import axios from 'axios';
    export default {
        components: {
        },
        
        methods: { 
            //metodos para enviar datos al server
            enviar() {
                var input = ace.edit("editor");
                var text = input.getValue();
                console.log(text);
                //let input = document.getElementById("editor").value;
                console.log(input);
                axios
                    .post("http://localhost:5000/route/interpretar", {text: text})
                    .then((response) => {
                        let output = document.getElementById("salida");
                        console.log(response);
                        output.value = response.data["consola"];
                    })
                    .catch((error) => {
                        throw error;
                    })
            },

            limpiar() {
                var input = ace.edit("editor");
                var text = input.setValue("");
            }
        },

        mounted() {
            const editor = ace.edit('editor');
            editor.setTheme('ace/theme/dracula');
            editor.session.setMode('ace/mode/java');
        }  
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,100&display=swap');

    #editor {
        width: 750px;
        height: 550px;
        font-size: 20px;
        box-shadow: 0 0 10px rgba(145, 147, 58, 0.715);
        color: #4DB2F3;
        font-family: 'Fira Code', monospace;
        padding: 10px;
        margin-right: 20px;
        float: left;
    }

    #salida {
        width: 550px;
        height: 550px;
        font-size: 20px;
        box-shadow: 0 0 10px rgba(228, 230, 149, 0.715);
        font-family: 'Fira Code', monospace;
        background-color: black;
        color: #8DED8E;
    }

    .button-container {
        position: relative;
        width: 200px;
        height: 50px;
    }

    .btn_primario, .btn_secundario, .btn_cargar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .btn_primario {
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

    .btn_secundario {
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

    .btn_crear {
        width: 100%;
        background-color: #000000;
        padding: 10px 10px;
        border: none;
        border-radius: 5px;
        box-shadow: 0px 2px 2px rgba(197, 255, 39, 0.7);
        margin-top: 20px;
        margin-left: 450px;
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        color: #bce4df;
    }

</style>

<template>
    <div id="editor"></div>
    <!--aqui ira mi salida de texto-->
    <textarea name="" id="salida"></textarea>
    <!--aqui iran los botones de ejecutar y limpiar-->
    <div class="button-container">
        <button class="btn_primario" type="button" v-on:click="enviar()">Ejecutar</button>
        <button class="btn_secundario" type="button" v-on:click="limpiar()">Limpiar</button>
    </div>
</template>