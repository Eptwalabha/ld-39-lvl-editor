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
        this.html_layouts = element.querySelector(".ui-tool-content") as HTMLElement;
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
            self.saveCurrentLayout();
        });
        element.querySelector("#ui-tool-menu-delete").addEventListener('click', function () {
            self.deleteCurrentLayout();
        });
        element.querySelector("#ui-tool-menu-copy").addEventListener('click', function () {
            self.copyCurrentLayout();
        });
    }

    createNewLayout() {

        var layoutName: string,
            validName: boolean,
            attempt = 0;

        do {
            attempt++;
            layoutName = prompt("new layout name", "layout-" + Date.now());
            validName = layoutName !== null && layoutName.length > 0 && !this.hasLayoutName(layoutName);
            console.log(layoutName, validName);
        } while (!validName && attempt < 3);

        if (validName) {
            var newLayout = {
                name: layoutName,
                layout: []
            };
            this.layoutEditor.load(newLayout);
            this.addNewLayoutToList(newLayout, true);
        }
    }

    saveCurrentLayout() {
        var json = JSON.stringify(this.layouts);
        localStorage.setItem("layouts", json);
    }

    private loadFromLocalStorage () {
        var jsonStr = localStorage.getItem("layouts");
        var json = JSON.parse(jsonStr);
        for (var i = 0; i < json.length; ++i) {
            this.addNewLayoutToList(json[i], i === 0);
            if (i === 0) this.layoutEditor.load(json[i]);
        }
    }

    deleteCurrentLayout() {
        console.log("delete");
    }

    copyCurrentLayout() {
        console.log("copy");
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
}