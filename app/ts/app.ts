/// <reference path="definitions/extra.d.ts" />

class MyEditor {

    constructor() {
        var editor = new Phaser.Game(600, 500, Phaser.AUTO, 'editor');
        editor.state.add('editor', new EditorState());
        editor.state.start('editor');
    }
}

window.onload = () => {

    new MyEditor();
};