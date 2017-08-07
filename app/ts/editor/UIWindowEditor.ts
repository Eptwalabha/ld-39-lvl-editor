class UIWindowEditor {
    private window:  HTMLElement;
    private reduce:  HTMLElement;
    private header:  HTMLElement;
    private editor: Editor;

    constructor (element: HTMLElement, editor: Editor) {
        this.window = element;
        this.reduce = element.querySelector('.ui-tool-reduce') as HTMLElement;
        this.header = element.querySelector('.ui-tool-header') as HTMLElement;
        this.editor = editor;

        var self = this;
        this.reduce.addEventListener('click', function () {
            self.toggleContentVisibility();
        });
    }

    private toggleContentVisibility () {
        if (this.window.classList.contains('folded')) {
            this.window.classList.remove('folded');
            this.reduce.classList.remove('folded');
        } else {
            this.window.classList.add('folded');
            this.reduce.classList.add('folded');
        }
    }
}