class UIEditor {
    private window:  HTMLElement;
    private reduce:  HTMLElement;
    protected header:  HTMLElement;
    protected editor: Editor;

    constructor (element: HTMLElement, editor: Editor) {
        this.window = element;
        this.reduce = element.querySelector('.ui-reduce') as HTMLElement;
        this.header = element.querySelector('.ui-section-header') as HTMLElement;
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

    protected actionOnEditor () {
        if (this.editor.onAction && typeof this.editor.onAction === 'function') {
            this.editor.onAction();
        }
    }
}