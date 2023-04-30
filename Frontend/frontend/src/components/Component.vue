<style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap');

    #editor {
        width: 750px;
        height: 550px;
        font-family: 'Fira Mono', monospace;
        font-size: 22px;
        box-shadow: 0 0 10px rgb(255, 255, 255);
        color: #457bd7;
    }
</style>

<script>
    import 'ace-builds/src-noconflict/ace';
    import 'ace-builds/src-noconflict/theme-solarized_dark';
    import 'ace-builds/src-noconflict/mode-java';

    export default {
        mounted() {
            const editor = ace.edit("editor");
            editor.setTheme('ace/theme/solarized_dark');
            editor.session.setMode('ace/mode/java');
            this.editor = editor;
        }
    }
    
</script>

<template>
    <div id="editor"></div>
</template>