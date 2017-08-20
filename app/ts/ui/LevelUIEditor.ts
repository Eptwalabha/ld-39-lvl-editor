class LevelUIEditor extends UIEditor {

    private levelEditor: LevelEditor;
    private htmlLevel: HTMLElement;

    constructor (element: HTMLElement, editor: LevelEditor) {
        super(element, editor);
        this.levelEditor = editor;
        this.htmlLevel = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.bindDialog();
        this.updateList();
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-tool-level-new").addEventListener('click', function () {
            self.actionOnEditor();
            self.createNewLevel();
        });
        element.querySelector("#ui-tool-level-save").addEventListener('click', function () {
            self.actionOnEditor();
            self.levelEditor.save();
        });
        element.querySelector("#ui-tool-level-delete").addEventListener('click', function () {
            self.actionOnEditor();
            self.deleteCurrentLevel();
        });
        element.querySelector("#ui-tool-level-copy").addEventListener('click', function () {
            self.actionOnEditor();
            self.copyCurrentLevel();
        });
    }

    private bindDialog () {
        var dialog = document.getElementById("dialog-edit-level");
        dialog.classList.remove("open");
        var buttonClose = dialog.querySelector("form button.close") as HTMLButtonElement;
        var buttonSubmit = dialog.querySelector("form button.submit") as HTMLButtonElement;
        buttonClose.addEventListener("click", function () {
            dialog.classList.remove("open");
        });
        var self = this;
        buttonSubmit.addEventListener("click", function () {
            var id = parseInt((dialog.querySelector("form input[name='level-id']") as HTMLInputElement).value, 10);
            var name = (dialog.querySelector("form input[name='level-name']") as HTMLInputElement).value;
            var layoutId = parseInt((dialog.querySelector("form select[name='layout-id']") as HTMLSelectElement).value, 10);
            self.levelEditor.updateLevel(id, name, layoutId);
            dialog.classList.remove("open");
            var span = document.querySelector("div[data-level-id='" + id + "'] > span");
            if (span) {
                span.innerHTML = name;
            }
        });
    }

    createNewLevel() {
        var name = this.promptNewName("new level name", "level-" + Date.now());
        if (name) {
            this.addNewLevel(name);
        }
    }

    addNewLevel (name: string) {
        var level = this.levelEditor.create(name);
        this.addNewLine(level, true);
        this.changeLevel(level.id);
    }

    deleteCurrentLevel() {
        var name = this.levelEditor.current.name;
        var confirmDelete = confirm("delete level " + name + "?");
        if (!confirmDelete) {
            return;
        }
        var line: HTMLElement = this.htmlLevel.querySelector(".active") as HTMLElement;
        line.parentElement.removeChild(line);
        this.levelEditor.deleteLevel(this);
    }

    copyCurrentLevel() {
        var name = this.promptNewName("copy's name", this.levelEditor.current.name + " (copy)");
        if (name) {
            this.levelEditor.copy(this, name);
            this.updateList();
        }
    }

    setSelectedLevel (id: number) {
        var elements = this.htmlLevel.querySelectorAll(".level-line") as NodeListOf<HTMLElement>;
        for (var i in elements) {
            if (!elements.hasOwnProperty(i)) continue;
            elements[i].classList.remove("active");
            if (elements[i].dataset.levelId === id.toString(10)) {
                elements[i].classList.add("active");
            }
        }
    }

    addNewLine (level: Level, selected = true) {
        var htmlLevel = document.createElement('div');
        var name = document.createElement('span');
        var edit = document.createElement('img');
        edit.src = "assets/images/level/edit.png";
        edit.alt = "edit level";
        edit.title = "edit this level";
        var self = this;
        edit.addEventListener('click', function () {
            self.levelEditor.edit(level.id);
        });
        htmlLevel.addEventListener('click', function () {
            self.actionOnEditor();
            self.changeLevel(level.id);
        });
        if (selected) {
            htmlLevel.classList.add("active");
        }
        name.innerText = level.name;
        htmlLevel.appendChild(name);
        htmlLevel.appendChild(edit);
        htmlLevel.title = level.name;
        htmlLevel.dataset.levelId = level.id.toString(10);
        htmlLevel.classList.add("level-line");
        this.htmlLevel.appendChild(htmlLevel);
    }

    private promptNewName (promptText: string, suggestion: string = "") {
        var levelName: string,
            validName: boolean,
            attempt = 0;
        do {
            attempt++;
            levelName = prompt(promptText, suggestion);
            if (!levelName) {
                return undefined;
            }
            validName = levelName.length > 0 && !this.nameAlreadyExists(levelName);
        } while (!validName && attempt < 3);

        if (validName) {
            return levelName;
        }
        return undefined;
    }

    private nameAlreadyExists(name: string) {
        return this.levelEditor.nameAlreadyExists(name);
    }

    private changeLevel(id: number) {
        this.levelEditor.load(id);
        this.setSelectedLevel(id);
    }

    public updateList() {
        var lines = this.htmlLevel.querySelectorAll(".level-line");
        for (var i = 0; i < lines.length; ++i) {
            lines[i].parentElement.removeChild(lines[i]);
        }
        this.levelEditor.updateList(this);
    }
}
