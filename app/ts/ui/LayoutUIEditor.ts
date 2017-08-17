class LayoutUIEditor extends UIEditor {

    private layoutEditor: LayoutEditor;
    private html_layouts: HTMLElement;

    constructor (element: HTMLElement, editor: LayoutEditor) {
        super(element, editor);
        this.layoutEditor = editor;
        this.html_layouts = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.updateList();
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-tool-menu-new").addEventListener('click', function () {
            self.actionOnEditor();
            self.createNewLayout();
        });
        element.querySelector("#ui-tool-menu-save").addEventListener('click', function () {
            self.actionOnEditor();
            self.layoutEditor.save();
        });
        element.querySelector("#ui-tool-menu-delete").addEventListener('click', function () {
            self.actionOnEditor();
            self.deleteCurrentLayout();
        });
        element.querySelector("#ui-tool-menu-copy").addEventListener('click', function () {
            self.actionOnEditor();
            self.copyCurrentLayout();
        });
    }

    createNewLayout() {
        var name = this.promptNewName("new layout name", "layout-" + Date.now());
        if (name) {
            this.addNewLayout(name);
        }
    }

    addNewLayout (name: string) {
        var layout = this.layoutEditor.create(name);
        this.addNewLine(layout, true);
        this.changeLayout(layout.id);
    }

    deleteCurrentLayout() {
        var name = this.layoutEditor.current.name;
        var confirmDelete = confirm("delete layout " + name + "?");
        if (!confirmDelete) {
            return;
        }
        var line: HTMLElement = this.html_layouts.querySelector("span.active") as HTMLElement;
        line.parentElement.removeChild(line);
        this.layoutEditor.deleteLayout(this);
    }

    copyCurrentLayout() {
        var name = this.promptNewName("copy's name", this.layoutEditor.current.name + " (copy)");
        if (name) {
            this.layoutEditor.copy(this, name);
            this.updateList();
        }
    }

    setSelectedLayout (id: number) {
        var elements = this.html_layouts.querySelectorAll("span.layout-line") as NodeListOf<HTMLElement>;
        for (var i in elements) {
            if (!elements.hasOwnProperty(i)) continue;
            elements[i].classList.remove("active");
            if (elements[i].dataset.layoutId === id.toString(10)) {
                elements[i].classList.add("active");
            }
        }
    }

    addNewLine (layout: Layout, selected = true) {
        var htmlLayout = document.createElement('span');
        var self = this;
        htmlLayout.addEventListener('click', function () {
            self.actionOnEditor();
            self.changeLayout(layout.id);
        });
        if (selected) {
            htmlLayout.classList.add("active");
        }
        htmlLayout.innerText = layout.name;
        htmlLayout.title = layout.name;
        htmlLayout.dataset.layoutId = layout.id.toString(10);
        htmlLayout.classList.add("layout-line");
        this.html_layouts.appendChild(htmlLayout);
    }

    private promptNewName (promptText: string, suggestion: string = "") {
        var layoutName: string,
            validName: boolean,
            attempt = 0;
        do {
            attempt++;
            layoutName = prompt(promptText, suggestion);
            if (!layoutName) {
                return undefined;
            }
            validName = layoutName.length > 0 && !this.nameAlreadyExists(layoutName);
        } while (!validName && attempt < 3);

        if (validName) {
            return layoutName;
        }
        return undefined;
    }

    private nameAlreadyExists(name: string) {
        return this.layoutEditor.nameAlreadyExists(name);
    }

    private changeLayout(id: number) {
        this.layoutEditor.load(id);
        this.setSelectedLayout(id);
    }

    public updateList() {
        var lines = this.html_layouts.querySelectorAll("span.layout-line");
        for (var i = 0; i < lines.length; ++i) {
            lines[i].parentElement.removeChild(lines[i]);
        }
        this.layoutEditor.updateList(this);
    }
}
