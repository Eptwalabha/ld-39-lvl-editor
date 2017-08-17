class EntityUIEditor extends UIEditor {

    private levelEditor: LevelEditor;
    private htmlSection: HTMLElement;
    private pen: PenLevelTool;
    private eraser: EraserLevelTool;
    private itemManager: ItemManager;
    private monsterManager: MonsterManager;

    constructor (element: HTMLElement, editor: LevelEditor, itemManager: ItemManager, monsterManager: MonsterManager) {
        super(element, editor);
        this.levelEditor = editor;
        this.itemManager = itemManager;
        this.monsterManager = monsterManager;
        this.htmlSection = element.querySelector(".ui-section-content") as HTMLElement;
        this.bindMenus(element);
        this.pen = new PenLevelTool();
        this.eraser = new EraserLevelTool();
        this.levelEditor.changeTool(this.pen);
    }

    private bindMenus (element: HTMLElement) {
        var self = this;
        element.querySelector("#ui-entity-level").addEventListener('click', function () {
            // TODO
            self.actionOnEditor();
            self.selectMenu(this);
            self.updateTool("level");
        });
        element.querySelector("#ui-entity-game-item").addEventListener('click', function () {
            // TODO
            // self.levelEditor.changeTool(self.pen);
            self.actionOnEditor();
            self.selectMenu(this);
            self.updateTool("items");
        });
        element.querySelector("#ui-entity-monster").addEventListener('click', function () {
            // TODO
            self.actionOnEditor();
            self.selectMenu(this);
            self.updateTool("monster");
        });
        element.querySelector("#ui-entity-eraser").addEventListener('click', function () {
            self.actionOnEditor();
            self.selectMenu(this);
            self.levelEditor.changeTool(self.eraser);
        });
    }

    private selectMenu(menu: HTMLImageElement) {
        var images = this.header.querySelectorAll("img");
        for (var i = 0; i < images.length; ++i) {
            images[i].classList.remove("selected");
        }
        menu.classList.add("selected");
        this.toggleMenu(menu.id)
    }

    private toggleMenu (menuId: string) {
        var result = this.htmlSection.querySelector("div[data-menu-id='" + menuId + "']");
        if (result) {
            var menus = this.htmlSection.querySelectorAll("div.toggle-menu-tab");
            for (var i in menus) {
                if (!menus.hasOwnProperty(i)) continue;
                menus[i].classList.remove("active");
            }
            result.classList.add("active");
            this.activeMenu(result as HTMLElement);
        }
    }

    private activeMenu(activeMenu: HTMLElement) {
    }

    private updateTool(type: string) {
    }
}
