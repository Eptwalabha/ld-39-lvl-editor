/// <reference path="definitions/extra.d.ts" />

class LevelEditor {

    constructor() {
        var editor = new Phaser.Game(600, 500, Phaser.AUTO, 'editor');
        editor.state.add('editor', new EditorState());
        editor.state.start('editor');
    }
}

class UIWindowEditor {
    private window:  HTMLElement;
    private reduce:  HTMLElement;
    private header:  HTMLElement;
    private top: number;
    private left: number;

    constructor (element: HTMLElement) {
        this.window = element;
        this.reduce = element.querySelector('.ui-window-reduce') as HTMLElement;
        this.header = element.querySelector('.ui-window-header') as HTMLElement;
        this.top = parseInt(this.window.style.top, 10);
        this.left = parseInt(this.window.style.left, 10);
        console.log(this.top, this.left);

        var self = this;
        this.reduce.addEventListener('click', function () {
            self.toggleContentVisibility();
        });

        this.header.addEventListener('mousedown', function () {
            console.log('click');
        });
    }

    private toggleContentVisibility () {
        if (this.window.classList.contains('hidden')) {
            this.window.classList.remove('hidden');
            this.reduce.classList.remove('hidden');
        } else {
            this.window.classList.add('hidden');
            this.reduce.classList.add('hidden');
        }
    }
}

window.onload = () => {

    var elements = document.querySelectorAll(".ui-window");
    for (var i = 0; i < elements.length; ++i) {
        var element: Node = elements[i];
        new UIWindowEditor(element as HTMLElement);
    }

    new LevelEditor();
};