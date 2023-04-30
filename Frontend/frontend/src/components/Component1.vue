<style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@100&display=swap');

    #salida {
        width: 750px;
        height: 550px;
        font-family: 'Fira Sans Condensed', sans-serif;
        font-size: 24px;
        box-shadow: 0 0 10px rgb(255, 255, 255);
        color: #8DED8E;
    }
</style>

<script>
    import 'ace-builds/src-noconflict/ace';
    import 'ace-builds/src-noconflict/mode-java';
    import 'ace-builds/src-noconflict/theme-twilight';

    export default {
        mounted() {
            const consola = ace.edit('salida');
            consola.setTheme('ace/theme/twilight');
            consola.session.setMode('ace/mode/java');
        }
    }
</script>

<template>
    <div id="salida"></div>
</template>