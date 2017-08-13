interface Layout {
    name: string,
    layout: Array<Array<number>>
}

class LayoutUIEditor extends UIEditor {

    private layoutEditor: LayoutEditor;
    private layouts: Array<Layout>;
    private html_layouts: HTMLElement;

    constructor (element: HTMLElement, editor: LayoutEditor) {
        super(element, editor);
        this.layoutEditor = editor;
        this.html_layouts = element.querySelector(".ui-section-content") as HTMLElement;
        this.layouts = [];
        this.bindMenus(element);
        this.loadFromLocalStorage();
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-tool-menu-new").addEventListener('click', function () {
            self.createNewLayout();
        });
        element.querySelector("#ui-tool-menu-save").addEventListener('click', function () {
            self.saveToLocalStorage();
        });
        element.querySelector("#ui-tool-menu-delete").addEventListener('click', function () {
            self.deleteCurrentLayout();
        });
        element.querySelector("#ui-tool-menu-copy").addEventListener('click', function () {
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
        var newLayout = {
            name: name,
            layout: []
        };
        this.layoutEditor.load(newLayout);
        this.addNewLayoutToList(newLayout, true);
    }

    deleteCurrentLayout() {
        var name = this.layoutEditor.current.name;
        var confirmDelete = confirm("delete layout " + name + "?");
        if (!confirmDelete) {
            return;
        }
        var line: HTMLElement = this.html_layouts.querySelector("span.active") as HTMLElement;
        line.parentElement.removeChild(line);
        var index = this.getIndex(name);
        if (index >= 0) {
            this.layouts.splice(index, 1);
            if (index >= this.layouts.length) {
                index--;
            }
            if (index >= 0) {
                this.html_layouts.querySelectorAll("span")[index].classList.add("active");
                this.layoutEditor.load(this.layouts[index]);
            } else {
                this.addNewLayout("no name");
            }
        }
    }

    copyCurrentLayout() {
        var name = this.promptNewName("copy's name", this.layoutEditor.current.name + " (copy)");
        if (name) {
            var newLayout = this.copyLayout(this.layoutEditor.current);
            newLayout.name = name;
            this.layoutEditor.load(newLayout);
            this.addNewLayoutToList(newLayout, true);
        }
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
            validName = layoutName.length > 0 && !this.hasLayoutName(layoutName);
        } while (!validName && attempt < 3);

        if (validName) {
            return layoutName;
        }
        return undefined;
    }

    private hasLayoutName(layoutName: string) {
        for (var i = 0; i < this.layouts.length; ++i) {
            if (this.layouts[i].name.toLowerCase() === layoutName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    private addNewLayoutToList(layout: Layout, selected = false) {
        this.layouts.push(layout);
        var html_layout = document.createElement('span');
        var self = this;
        html_layout.addEventListener('click', function () {
            self.loadLayout(html_layout, layout);
        });
        if (selected) {
            var spans = this.html_layouts.querySelectorAll("span");
            for (var i = 0; i < spans.length; ++i) {
                spans[i].classList.remove("active");
            }
            html_layout.classList.add("active");
        }
        html_layout.innerText = layout.name;
        html_layout.title = layout.name;
        this.html_layouts.appendChild(html_layout);
    }

    private loadLayout(element: HTMLElement, layout: Layout) {
        this.layoutEditor.load(layout);
        var spans = this.html_layouts.querySelectorAll("span");
        for (var i = 0; i < spans.length; ++i) {
            spans[i].classList.remove("active");
        }
        element.classList.add("active");
    }

    private copyLayout (layout: Layout): Layout {
        var copy: Layout = {
            name: layout.name,
            layout: []
        };
        for (var j = 0; j < layout.layout.length; ++j) {
            copy.layout[j] = [];
            if (!layout.layout[j]) {
                continue;
            }
            for (var i = 0; i < layout.layout[j].length; ++i) {
                if (!layout.layout[j][i] && layout.layout[j][i] !== 0) {
                    copy.layout[j][i] = null;
                } else {
                    copy.layout[j][i] = layout.layout[j][i];
                }
            }
        }
        return copy;
    }

    private saveToLocalStorage() {
        var layouts: Array<Layout> = [];
        for (var l = 0; l < this.layouts.length; ++l) {
            var layout = this.copyLayout(this.layouts[l]);
            layouts.push(layout);
        }
        var json = JSON.stringify(layouts);
        localStorage.setItem("layouts", json);
    }

    private loadFromLocalStorage () {
        var jsonStr = localStorage.getItem("layouts");
        try {
            var json = JSON.parse(jsonStr);
            for (var i = 0; i < json.length; ++i) {
                this.addNewLayoutToList(json[i], i === 0);
                if (i === 0) this.layoutEditor.load(json[i]);
            }
        } catch (err) {
            this.addNewLayout("blank");
        }
    }

    private getIndex(name: string) {
        for (var i = 0; i < this.layouts.length; ++i) {
            if (this.layouts[i].name === name) {
                return i;
            }
        }
        return -1;
    }
}
